﻿using System;
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
  public class PlayersController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public PlayersController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Player
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Player>>> GetPlayers(int gameId)
    {
      return await _context.Players.Where(w => w.GameId == gameId).ToListAsync();
    }

    // // GET: api/Player/5
    // [HttpGet("{id}")]
    // public async Task<ActionResult<Player>> GetPlayer(int id)
    // {
    //   var player = await _context.Players.FindAsync(id);

    //   if (player == null)
    //   {
    //     return NotFound();
    //   }

    //   return player;
    // }

    // // PUT: api/Player/5
    // // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPlayer(int id, int gameId, Player player)
    {
      if (id != player.Id || gameId != player.GameId)
      {
        return BadRequest();
      }

      _context.Entry(player).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!PlayerExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return Ok();
    }

    [HttpPost]
    public async Task<ActionResult<Player>> PostPlayer(int gameId, Player player)
    {
      player.GameId = gameId;
      _context.Players.Add(player);
      await _context.SaveChangesAsync();

      return Ok(player);
    }

    // // DELETE: api/Player/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Player>> DeletePlayer(int id, int gameId)
    {
      var player = await _context.Players.FirstOrDefaultAsync(f => f.Id == id && f.GameId == gameId);
      if (player == null)
      {
        return NotFound();
      }

      _context.Players.Remove(player);
      await _context.SaveChangesAsync();

      return player;
    }

    private bool PlayerExists(int id)
    {
      return _context.Players.Any(e => e.Id == id);
    }
  }
}
