using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;

namespace MejdisiIm.Repositories
{
    public class GreenTipRepository : Repository<GreenTip>, IGreenTipRepository
    {
        public GreenTipRepository(MejdisiImContext context) : base(context) { }
    }

}
