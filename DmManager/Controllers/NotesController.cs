using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DmManager;
using DmManager.Models;

namespace DmManager.Controllers
{
  [Route("api/game/{gameId}/[controller]")]
  [ApiController]
  public class NotesController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public NotesController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Notes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes(int gameId)
    {
      return await _context.Notes.OrderByDescending(o => o.When).Where(w => w.GameId == gameId).ToListAsync();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes(int gameId, [FromQuery]string term)
    {
      return await _context.Notes
        .OrderByDescending(o => o.When)
        .Where(w => w.GameId == gameId && w.Body.ToLower().Contains(term.ToLower())).ToListAsync();
    }

    // // GET: api/Notes/5
    // [HttpGet("{id}")]
    // public async Task<ActionResult<Note>> GetNote(int id)
    // {
    //   var note = await _context.Notes.FindAsync(id);

    //   if (note == null)
    //   {
    //     return NotFound();
    //   }

    //   return note;
    // }

    // PUT: api/Notes/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    // [HttpPut("{id}")]
    // public async Task<IActionResult> PutNote(int id, Note note)
    // {
    //   if (id != note.Id)
    //   {
    //     return BadRequest();
    //   }

    //   _context.Entry(note).State = EntityState.Modified;

    //   try
    //   {
    //     await _context.SaveChangesAsync();
    //   }
    //   catch (DbUpdateConcurrencyException)
    //   {
    //     if (!NoteExists(id))
    //     {
    //       return NotFound();
    //     }
    //     else
    //     {
    //       throw;
    //     }
    //   }

    //   return NoContent();
    // }

    // // POST: api/Notes
    // // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult<Note>> PostNote(int gameId, NoteVM noteVM)
    {
      var noteEntity = _context.Notes.Add(new Note());
      noteEntity.CurrentValues.SetValues(noteVM);
      noteEntity.Entity.GameId = gameId;
      await _context.SaveChangesAsync();

      return Ok(noteEntity.Entity);
    }

    // DELETE: api/Notes/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Note>> DeleteNote(int gameId, int id)
    {
      var note = await _context.Notes.FindAsync(id);
      if (note == null || note.GameId != gameId)
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
