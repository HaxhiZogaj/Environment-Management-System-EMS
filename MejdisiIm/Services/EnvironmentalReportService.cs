using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.Repositories.Interfaces;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MejdisiIm.Services
{
    public class EnvironmentalReportService : IEnvironmentalReportService
    {
        private readonly MejdisiImContext _context;
        private readonly IMapper _mapper;

        public EnvironmentalReportService(MejdisiImContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EnvironmentalReportViewModel>> GetAllAsync()
        {
            var reports = await _context.EnvironmentalReports
                .Include(r => r.Category)
                .Include(r => r.User)
                .Include(r => r.Comments)
                .Include(r => r.Votes)
                .ToListAsync();

            return reports.Select(r => MapToViewModel(r)).ToList();
        }

        public async Task<EnvironmentalReportViewModel> GetByIdAsync(int id)
        {
            var report = await _context.EnvironmentalReports
                .Include(r => r.Category)
                .Include(r => r.User)
                .Include(r => r.Comments)
                .Include(r => r.Votes)
                .FirstOrDefaultAsync(r => r.ReportId == id);

            if (report == null) return null;

            return MapToViewModel(report);
        }

        public async Task AddAsync(EnvironmentalReportViewModel vm)
        {
            var model = MapToModel(vm);
            await _context.EnvironmentalReports.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(EnvironmentalReportViewModel vm)
        {
            var existing = await _context.EnvironmentalReports.FindAsync(vm.ReportId);
            if (existing != null)
            {
                var updatedModel = MapToModel(vm);
                _mapper.Map(updatedModel, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var model = await _context.EnvironmentalReports.FindAsync(id);
            if (model != null)
            {
                _context.EnvironmentalReports.Remove(model);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<EnvironmentalReportDto>> GetDropdownAsync()
        {
            return await _context.EnvironmentalReports
                .Select(r => new EnvironmentalReportDto
                {
                    ReportId = r.ReportId,
                    Title = r.Title
                }).ToListAsync();
        }


        private EnvironmentalReport MapToModel(EnvironmentalReportViewModel vm)
        {
            var model = new EnvironmentalReport
            {
                ReportId = vm.ReportId,
                Title = vm.Title,
                Description = vm.Description,
                Latitude = vm.Latitude,
                Longitude = vm.Longitude,
                ImageUrl = vm.ImageUrl,
                Status = vm.Status,
                CreatedAt = vm.CreatedAt,
                UserId = vm.UserId,
                CategoryId = vm.CategoryId,

            };

            return model;
        }

        private EnvironmentalReportViewModel MapToViewModel(EnvironmentalReport model)
        {
            var vm = new EnvironmentalReportViewModel
            {
                ReportId = model.ReportId ?? 0,
                Title = model.Title,
                Description = model.Description,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                ImageUrl = model.ImageUrl,
                Status = model.Status,
                CreatedAt = model.CreatedAt,
                FullName = model.User?.FullName,
                Name = model.Category?.Name

            };

            return vm;
        }


        public async Task<List<UserDto>> GetUsersDropdownAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<ReportCategoryDto>> GetReportDropdownAsync()
        {
            var reportCategories = await _context.ReportCategories.ToListAsync();
            return _mapper.Map<List<ReportCategoryDto>>(reportCategories);
        }

    }
}
