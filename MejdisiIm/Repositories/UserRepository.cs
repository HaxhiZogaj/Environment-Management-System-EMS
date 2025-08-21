using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(MejdisiImContext context) : base(context) { }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }
    }

}
