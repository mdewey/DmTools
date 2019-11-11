using System;

namespace DmManager.Models
{
  public class Note
  {
    public int Id { get; set; }
    public string Body { get; set; }
    public DateTime When { get; set; } = DateTime.UtcNow;
    public int GameId { get; set; }
    public Game Game { get; set; }

  }
}