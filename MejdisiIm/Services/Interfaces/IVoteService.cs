using MejdisiIm.DTOs;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Services.Interfaces
{
    public interface IVoteService
    {
        Task<List<VoteViewModel>> GetAllAsync();
        Task<VoteViewModel> GetByIdAsync(int id);
        Task AddAsync(VoteViewModel vm);
        Task UpdateAsync(VoteViewModel vm);
        Task DeleteAsync(int id);

        Task<List<UserDto>> GetUsersDropdownAsync();
        Task<List<EnvironmentalReportDto>> GetReportsDropdownAsync();
    }
}
