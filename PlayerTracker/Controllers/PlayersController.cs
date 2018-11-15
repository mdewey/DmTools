using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PlayerTracker.Controllers
{
    [Route("api/[controller]")]
    public class PlayersController : Controller
    {

        private PlayerTrackerContext _db;

        public PlayersController()
        {
            this._db = new PlayerTrackerContext();
        }

        [HttpGet]
        public ActionResult GetAction()
        {
            return Ok(_db.Players.OrderByDescending(o => o.LastInitiative).ThenBy(t => t.PlayerName));
        }

        [HttpPost]
        public ActionResult Post([FromBody]Models.Player player)
        {

            _db.Players.Add(player);
            _db.SaveChanges();
            return Ok(player);
        }

        [HttpPost("{playerId}/initiative/{init}")]
        public ActionResult UpdatePlayerInit([FromRoute] int playerId, [FromRoute] int init)
        {
            var player = _db.Players.FirstOrDefault(f => f.Id == playerId);
            player.LastInitiative = init;
            _db.SaveChanges();
            return Ok();
        }

        [HttpDelete("{playerId}")]
        public ActionResult Delete([FromRoute]int playerId)
        {
            var player = _db.Players.FirstOrDefault(f => f.Id == playerId);
            _db.Players.Remove(player);
            _db.SaveChanges();
            return Ok();
        }
    }
}