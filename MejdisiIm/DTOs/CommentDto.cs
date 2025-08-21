namespace MejdisiIm.DTOs
{
    public class CommentDto
    {
        //public int? CommentId { get; set; }

        //public string Content { get; set; }

        public int? CommentId { get; set; } // Nullable
        public int ReportId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}

