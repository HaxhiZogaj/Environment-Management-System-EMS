namespace MejdisiIm.DTOs
{
    public class UserDto
    {

        public int UserId { get; set; }
        public string FullName { get; set; }  // ose ndonjë fushë tjetër nga User që dëshiron


        public class RegisterRequest
        {
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

            public string Role { get; set; } = "Costumer";
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }

        }

        public class LogoutRequest
        {
            public Guid SessionId { get; set; }
        }
    }
}
