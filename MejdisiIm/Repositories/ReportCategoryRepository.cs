using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;

namespace MejdisiIm.Repositories
{
    public class ReportCategoryRepository : Repository<ReportCategory>, IReportCategoryRepository
    {
        public ReportCategoryRepository(MejdisiImContext context) : base(context) { }
    }

}
