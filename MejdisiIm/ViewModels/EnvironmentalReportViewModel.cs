using MejdisiIm.Models;
using System.ComponentModel.DataAnnotations;

namespace MejdisiIm.ViewModels
{
    public class EnvironmentalReportViewModel
    {

        [Key]
        public int? ReportId { get; set; }

        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public string Description { get; set; }

        public double? Latitude { get; set; }

        public double? Longitude { get; set; }

        public string ImageUrl { get; set; }

        public string Status { get; set; }

        public DateTime? CreatedAt { get; set; }

        public string? FullName { get; set; }

        public string? Name { get; set; }



    }
}
