using MejdisiIm.Models;

namespace MejdisiIm.ViewModels
{
    public class ReportCategoryViewModel
    {
        public int? CategoryId { get; set; }

        public string Name { get; set; }
        public virtual ICollection<EnvironmentalReport> EnvironmentalReports { get; set; } = new List<EnvironmentalReport>();

    }
}
