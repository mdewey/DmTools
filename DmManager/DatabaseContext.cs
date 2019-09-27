using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using DmManager.Models;

namespace DmManager
{
  public class DatabaseContext : DbContext
  {

    public DbSet<PointOfInterest> PointOfInterests { get; set; }
    public DbSet<Game> Games { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite("Data Source=database.db");
  }
}
