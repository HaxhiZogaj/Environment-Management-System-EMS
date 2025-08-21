using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Services
{
    public class CommentService : ICommentService
    {
        private readonly MejdisiImContext _context;
        private readonly IMapper _mapper;

        public CommentService(MejdisiImContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private Comment MapToModel(CommentViewModel vm)
        {
            return new Comment
            {
                CommentId = vm.CommentId,
                Content = vm.Content,
                CreatedAt = vm.CreatedAt,
                UserId = vm.UserId ?? 0,
                ReportId = vm.ReportId ?? 0,
            };
        }

        private CommentViewModel MapToViewModel(Comment model)
        {
            return new CommentViewModel
            {
                CommentId = model.CommentId,
                Content = model.Content,
                CreatedAt = model.CreatedAt,
                UserId = model.UserId,
                ReportId = model.ReportId,
                FullName = model.User?.FullName,
                ReportTitle = model.Report?.Title
            };
        }


        public async Task<List<CommentViewModel>> GetAllAsync()
        {
            var comments = await _context.Comments
                .Include(c => c.User)
                .Include(c => c.Report)
                .ToListAsync();

            return comments.Select(MapToViewModel).ToList();
        }

        public async Task<CommentViewModel> GetByIdAsync(int id)
        {
            var comment = await _context.Comments
                .Include(c => c.User)
                .Include(c => c.Report)
                .FirstOrDefaultAsync(c => c.CommentId == id);

            return comment != null ? MapToViewModel(comment) : null;
        }

        public async Task AddAsync(CommentViewModel vm)
        {
            var model = MapToModel(vm);
            await _context.Comments.AddAsync(model);
            await _context.SaveChangesAsync();
        }



        public async Task UpdateAsync(CommentViewModel vm)
        {
            var existing = await _context.Comments.FindAsync(vm.CommentId);
            if (existing != null)
            {
                var updated = MapToModel(vm);
                _mapper.Map(updated, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<List<UserDto>> GetUsersDropdownAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<EnvironmentalReportDto>> GetReportsDropdownAsync()
        {
            var reports = await _context.EnvironmentalReports.ToListAsync();
            return _mapper.Map<List<EnvironmentalReportDto>>(reports);
        }

    }
}
