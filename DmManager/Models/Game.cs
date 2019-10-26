using System;
using System.Collections.Generic;

namespace DmManager.Models
{
  public class Game
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime StartedDate { get; set; } = DateTime.Now;

    public List<PointOfInterest> PointOfInterest { get; set; } = new List<PointOfInterest>();

    public List<Player> Players { get; set; } = new List<Player>();

    public Hours Hours { get; set; }

  }
}