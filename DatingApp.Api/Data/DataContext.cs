using Microsoft.EntityFrameworkCore;
using DatingApp.Api.Models;

namespace DatingApp.Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Value>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();
    } 
    }
}
