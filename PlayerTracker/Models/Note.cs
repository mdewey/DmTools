using System;

namespace PlayerTracker.Models
{
  public class Note
  {
    public int Id { get; set; }
    private string _content;
    public string Content
    {
      get { return _content; }
      set
      {
        this.DateUpdated = DateTime.Now;
        _content = value;
      }
    }
    public DateTime? DateUpdated { get; set; } = DateTime.Now;
    public void WasUpdated() => this.DateUpdated = DateTime.Now;
  }
}