using MejdisiIm.Models;
using System.ComponentModel.DataAnnotations;

namespace MejdisiIm.ViewModels
{
    public class VoteViewModel
    {

        public int? VoteId { get; set; }

        public string Type { get; set; }

        [Required]
        public int ReportId { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime? VotedAt { get; set; }

        public string? ReportTitle { get; set; }
        public string? FullName { get; set; }

    }
}
