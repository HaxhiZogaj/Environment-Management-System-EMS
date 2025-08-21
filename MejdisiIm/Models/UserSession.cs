namespace MejdisiIm.Models
{
    public partial class UserSession
    {
        public Guid SessionId { get; set; }

        public int? UserId { get; set; }

        public string TokenHash { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime ExpiresAt { get; set; }

        public bool? IsValid { get; set; }

        public virtual User User { get; set; }
    }
}
