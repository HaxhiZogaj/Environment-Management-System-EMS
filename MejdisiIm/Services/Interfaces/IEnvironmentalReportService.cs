using MejdisiIm.DTOs;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Services.Interfaces
{
    public interface IEnvironmentalReportService
    {
        Task<List<EnvironmentalReportViewModel>> GetAllAsync();
        Task<EnvironmentalReportViewModel> GetByIdAsync(int id);
        Task AddAsync(EnvironmentalReportViewModel viewModel);
        Task UpdateAsync(EnvironmentalReportViewModel viewModel);
        Task DeleteAsync(int id);
        //Task<List<EnvironmentalReportDto>> GetDropdownAsync();
        Task<List<UserDto>> GetUsersDropdownAsync();
        Task<List<ReportCategoryDto>> GetReportDropdownAsync();

    }
}
