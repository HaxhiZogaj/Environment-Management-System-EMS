using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;

namespace MejdisiIm.Repositories
{
    public class RecyclingCenterRepository : Repository<RecyclingCenter>, IRecyclingCenterRepository
    {
        public RecyclingCenterRepository(MejdisiImContext context) : base(context) { }
    }

}
