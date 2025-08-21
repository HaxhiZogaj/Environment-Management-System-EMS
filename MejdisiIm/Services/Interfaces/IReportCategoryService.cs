using MejdisiIm.DTOs;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Services.Interfaces
{
    public interface IReportCategoryService
    {
        Task<List<ReportCategoryViewModel>> GetAllAsync();
        Task<ReportCategoryViewModel> GetByIdAsync(int id);
        Task AddAsync(ReportCategoryViewModel vm);
        Task UpdateAsync(ReportCategoryViewModel vm);
        Task DeleteAsync(int id);
        //Task<List<ReportCategoryDto>> GetDropdownAsync();
    }
}
