using MejdisiIm.Models;
using System.ComponentModel.DataAnnotations;

namespace MejdisiIm.ViewModels
{
    public class CommentViewModel
    {
        public int? CommentId { get; set; }

        [Required]
        public int? ReportId { get; set; }

        [Required]
        public int? UserId { get; set; }


        [Required]
        [StringLength(500)]
        public string Content { get; set; }

        public DateTime? CreatedAt { get; set; }

        public string? ReportTitle { get; set; }
        public string? FullName { get; set; }

    }
}
