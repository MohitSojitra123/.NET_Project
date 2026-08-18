using Microsoft.EntityFrameworkCore;
using Student_Project_Management.Models;

namespace Student_Project_Management.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
       : base(options) { }


        public DbSet<UsersModel> Users  {get; set;}

        public DbSet<RoleModel> Roles { get; set; }

        public DbSet<UserRoleModel> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // ==========================================
            // USER → USERROLE
            // ==========================================

            modelBuilder.Entity<UserRoleModel>()
                .HasOne(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            // ==========================================
            // ROLE → USERROLE
            // ==========================================

            modelBuilder.Entity<UserRoleModel>()
                .HasOne(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Cascade);


    
        }

    }
}
