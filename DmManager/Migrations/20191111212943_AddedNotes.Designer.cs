﻿// <auto-generated />
using System;
using DmManager;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DmManager.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20191111212943_AddedNotes")]
    partial class AddedNotes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("DmManager.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<DateTime>("StartedDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("DmManager.Models.Hours", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("GameId")
                        .HasColumnType("integer");

                    b.Property<int>("Time")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GameId")
                        .IsUnique();

                    b.ToTable("Hours");
                });

            modelBuilder.Entity("DmManager.Models.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Body")
                        .HasColumnType("text");

                    b.Property<int>("GameId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("When")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("DmManager.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CurrentInitiative")
                        .HasColumnType("integer");

                    b.Property<int>("GameId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("DmManager.Models.PointOfInterest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("FlavorText")
                        .HasColumnType("text");

                    b.Property<int>("GameId")
                        .HasColumnType("integer");

                    b.Property<string>("Letter")
                        .HasColumnType("text");

                    b.Property<string>("LongDescription")
                        .HasColumnType("text");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("PointOfInterests");
                });

            modelBuilder.Entity("DmManager.Models.Hours", b =>
                {
                    b.HasOne("DmManager.Models.Game", "Game")
                        .WithOne("Hours")
                        .HasForeignKey("DmManager.Models.Hours", "GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DmManager.Models.Note", b =>
                {
                    b.HasOne("DmManager.Models.Game", "Game")
                        .WithMany()
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DmManager.Models.Player", b =>
                {
                    b.HasOne("DmManager.Models.Game", "Game")
                        .WithMany("Players")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DmManager.Models.PointOfInterest", b =>
                {
                    b.HasOne("DmManager.Models.Game", "Game")
                        .WithMany("PointOfInterest")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}