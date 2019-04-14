using Microsoft.EntityFrameworkCore.Migrations;

namespace PlayerTracker.Migrations
{
    public partial class ChangedInitTiDouble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "LastInitiative",
                table: "Players",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "LastInitiative",
                table: "Players",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
