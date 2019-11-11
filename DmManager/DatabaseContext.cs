using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using DmManager.Models;
using System;
using System.Text.RegularExpressions;

namespace DmManager
{
  public class DatabaseContext : DbContext
  {

    public DbSet<PointOfInterest> PointOfInterests { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<Hours> Hours { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Note> Notes { get; set; }

    private string ConvertPostConnectionToConnectionString(string connection)
    {
      var _connection = connection.Replace("postgres://", String.Empty);
      var output = Regex.Split(_connection, ":|@|/");
      return $"server={output[2]};database={output[4]};User Id={output[0]}; password={output[1]}; port={output[3]}";
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var envConn = Environment.GetEnvironmentVariable("DATABASE_URL");
        var conn = "server=localhost;database=DmManagerDatabase";
        if (envConn != null)
        {
          conn = ConvertPostConnectionToConnectionString(envConn);
        }
        optionsBuilder.UseNpgsql(conn);
      }
    }


  }
}
