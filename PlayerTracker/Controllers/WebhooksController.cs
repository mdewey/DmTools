using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PlayerTracker.Controllers
{
    [Route("api/[controller]")]
    public class WebHooksController : Controller
    {

        [HttpPost("slack/init")]
        public async Task<ActionResult> AddPlayerInit([FromForm] string text)
        {
            // split input
            // add or update player
            var input = text.Split(' ');
            var pc = input[0];
            var init = int.Parse(input[1]);
            var db = new PlayerTrackerContext();
            var player = db.Players.FirstOrDefault(f => f.PlayerName.ToLower() == pc.ToLower());
            if (player == null)
            {
                player = new Models.Player { PlayerName = pc, LastInitiative = init };
                db.Players.Add(player);
            }
            else
            {
                player.LastInitiative = init;
            }
            await db.SaveChangesAsync();
            return Ok(new
            {
                text = $"Updated {player.PlayerName} with an init of {player.LastInitiative}"
            });
        }
    }
}
