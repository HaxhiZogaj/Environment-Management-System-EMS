using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;

namespace MejdisiIm.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(MejdisiImContext context) : base(context) { }
    }

}
