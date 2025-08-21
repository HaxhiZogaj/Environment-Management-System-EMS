using MejdisiIm.DTOs;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Services.Interfaces
{
    public interface IRecyclingCenterService
    {
        Task<List<RecyclingCenterViewModel>> GetAllAsync();
        Task<RecyclingCenterViewModel> GetByIdAsync(int id);
        Task AddAsync(RecyclingCenterViewModel vm);
        Task UpdateAsync(RecyclingCenterViewModel vm);
        Task DeleteAsync(int id);
        Task<List<RecyclingCenterDto>> GetDropdownAsync();
    }
}
