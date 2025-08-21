using MejdisiIm.DTOs;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Services.Interfaces
{
    public interface ICommentService
    {
        Task<List<CommentViewModel>> GetAllAsync();
        Task<CommentViewModel> GetByIdAsync(int id);
        Task AddAsync(CommentViewModel vm);
        Task UpdateAsync(CommentViewModel vm);
        Task DeleteAsync(int id);

        Task<List<UserDto>> GetUsersDropdownAsync();
        Task<List<EnvironmentalReportDto>> GetReportsDropdownAsync();

    }
}
