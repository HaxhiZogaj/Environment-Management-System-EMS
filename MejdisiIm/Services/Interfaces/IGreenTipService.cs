using MejdisiIm.DTOs;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Services.Interfaces
{
    public interface IGreenTipService
    {
        Task<List<GreenTipViewModel>> GetAllAsync();
        Task<GreenTipViewModel> GetByIdAsync(int id);
        Task AddAsync(GreenTipViewModel vm);
        Task UpdateAsync(GreenTipViewModel vm);
        Task DeleteAsync(int id);
        Task<List<GreenTipDto>> GetDropdownAsync();
    }
}
