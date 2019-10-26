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
  public class HoursController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public HoursController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Hours
    [HttpGet]
    public async Task<ActionResult<Hours>> GetHours(int gameId)
    {
      var hours = await _context.Hours.FirstOrDefaultAsync(f => f.GameId == gameId);
      if (hours == null)
      {
        hours = new Hours
        {
          GameId = gameId
        };
        await _context.Hours.AddAsync(hours);
        await _context.SaveChangesAsync();
      }
      return hours;
    }

    // PUT: api/Hours/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutHours(int id, int gameId, Hours hours)
    {
      if (id != hours.Id && gameId != hours.GameId)
      {
        return BadRequest();
      }
      hours.DateUpdated = DateTime.UtcNow;
      _context.Entry(hours).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!HoursExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }


    private bool HoursExists(int id)
    {
      return _context.Hours.Any(e => e.Id == id);
    }
  }
}
