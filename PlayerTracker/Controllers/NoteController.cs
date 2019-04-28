using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerTracker;
using PlayerTracker.Models;

namespace PlayerTracker.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NoteController : ControllerBase
  {
    private readonly PlayerTrackerContext _context;

    public NoteController(PlayerTrackerContext context)
    {
      _context = context;
    }

    // GET: api/Note
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
      return await _context.Notes.ToListAsync();
    }

    [HttpGet("latest")]
    public async Task<ActionResult<Note>> GetLatestNote()
    {
      var note = await _context.Notes.OrderByDescending(o => o.DateUpdated).FirstOrDefaultAsync();

      if (note == null)
      {
        note = new Note();
        await _context.Notes.AddAsync(note);
        await _context.SaveChangesAsync();
      }

      return note;
    }


    // GET: api/Note/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
      var note = await _context.Notes.FindAsync(id);

      if (note == null)
      {
        return NotFound();
      }

      return note;
    }

    // PUT: api/Note/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNote(int id, Note note)
    {
      if (id != note.Id)
      {
        return BadRequest();
      }

      _context.Entry(note).State = EntityState.Modified;
      note.WasUpdated();
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!NoteExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return Ok(note);
    }

    // POST: api/Note
    [HttpPost]
    public async Task<ActionResult<Note>> PostNote(Note note)
    {
      _context.Notes.Add(note);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetNote", new { id = note.Id }, note);
    }

    // DELETE: api/Note/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Note>> DeleteNote(int id)
    {
      var note = await _context.Notes.FindAsync(id);
      if (note == null)
      {
        return NotFound();
      }

      _context.Notes.Remove(note);
      await _context.SaveChangesAsync();

      return note;
    }

    private bool NoteExists(int id)
    {
      return _context.Notes.Any(e => e.Id == id);
    }
  }
}
