using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Repositories
{
    public class EnvironmentalReportRepository : Repository<EnvironmentalReport>, IEnvironmentalReportRepository
    {
        public EnvironmentalReportRepository(MejdisiImContext context) : base(context) { }

    }

}
