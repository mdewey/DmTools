using System;

namespace DmManager.Models
{
  public class Hours
  {
    public int Id { get; set; }
    private int _time;
    public int Time
    {
      get { return _time; }
      set
      {
        this.DateUpdated = DateTime.Now;
        _time = value;
      }
    }

    public DateTime DateUpdated { get; set; } = DateTime.Now;
    public int GameId { get; set; }
    public Game Game { get; set; }
  }
}