using MejdisiIm.Models;

namespace MejdisiIm.ViewModels
{
    public class UserViewModel
    {
        public int UserId { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string Role { get; set; } = "Costumer";

    }
}
