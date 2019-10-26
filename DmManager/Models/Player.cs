namespace DmManager.Models
{
  public class Player
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int CurrentInitiative { get; set; } = 0;

    public int GameId { get; set; }
    public Game Game { get; set; }

  }
}