using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DmManager;
using DmManager.Models;

namespace DmManager.Controllers
{
  public class PlayerAdminController : Controller
  {
    private readonly DatabaseContext _context;

    public PlayerAdminController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: PlayerAdmin
    public async Task<IActionResult> Index()
    {
      var databaseContext = _context.Players.Include(p => p.Game);
      return View(await databaseContext.ToListAsync());
    }

    // GET: PlayerAdmin/Details/5
    public async Task<IActionResult> Details(int? id)
    {
      if (id == null)
      {
        return NotFound();
      }

      var player = await _context.Players
          .Include(p => p.Game)
          .FirstOrDefaultAsync(m => m.Id == id);
      if (player == null)
      {
        return NotFound();
      }

      return View(player);
    }

    // GET: PlayerAdmin/Create
    public IActionResult Create()
    {
      ViewData["GameId"] = new SelectList(_context.Games, "Id", "Name");
      return View();
    }

    // POST: PlayerAdmin/Create
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
    // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Name,CurrentInitiative,GameId")] Player player)
    {
      if (ModelState.IsValid)
      {
        _context.Add(player);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
      }
      ViewData["GameId"] = new SelectList(_context.Games, "Id", "Name", player.GameId);
      return View(player);
    }

    // GET: PlayerAdmin/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
      if (id == null)
      {
        return NotFound();
      }

      var player = await _context.Players.FindAsync(id);
      if (player == null)
      {
        return NotFound();
      }
      ViewData["GameId"] = new SelectList(_context.Games, "Id", "Name", player.GameId);
      return View(player);
    }

    // POST: PlayerAdmin/Edit/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
    // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Name,CurrentInitiative,GameId")] Player player)
    {
      if (id != player.Id)
      {
        return NotFound();
      }

      if (ModelState.IsValid)
      {
        try
        {
          _context.Update(player);
          await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
          if (!PlayerExists(player.Id))
          {
            return NotFound();
          }
          else
          {
            throw;
          }
        }
        return RedirectToAction(nameof(Index));
      }
      ViewData["GameId"] = new SelectList(_context.Games, "Id", "Name", player.GameId);
      return View(player);
    }

    // GET: PlayerAdmin/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
      if (id == null)
      {
        return NotFound();
      }

      var player = await _context.Players
          .Include(p => p.Game)
          .FirstOrDefaultAsync(m => m.Id == id);
      if (player == null)
      {
        return NotFound();
      }

      return View(player);
    }

    // POST: PlayerAdmin/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
      var player = await _context.Players.FindAsync(id);
      _context.Players.Remove(player);
      await _context.SaveChangesAsync();
      return RedirectToAction(nameof(Index));
    }

    private bool PlayerExists(int id)
    {
      return _context.Players.Any(e => e.Id == id);
    }
  }
}
