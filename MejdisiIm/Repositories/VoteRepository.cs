using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;

namespace MejdisiIm.Repositories
{
    public class VoteRepository : Repository<Vote>, IVoteRepository
    {
        public VoteRepository(MejdisiImContext context) : base(context) { }
    }

}
