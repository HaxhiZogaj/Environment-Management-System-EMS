using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Services
{
    public class ReportCategoryService : IReportCategoryService
    {
        private readonly MejdisiImContext _context;
        private readonly IMapper _mapper;

        public ReportCategoryService(MejdisiImContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private ReportCategory MapToModel(ReportCategoryViewModel vm)
        {
            return new ReportCategory
            {
                CategoryId = vm.CategoryId,
                Name = vm.Name
            };
        }

        private ReportCategoryViewModel MapToViewModel(ReportCategory model)
        {
            return new ReportCategoryViewModel
            {
                CategoryId = model.CategoryId,
                Name = model.Name
            };
        }

        public async Task<List<ReportCategoryViewModel>> GetAllAsync()
        {
            var categories = await _context.ReportCategories.ToListAsync();
            return categories.Select(MapToViewModel).ToList();
        }

        public async Task<ReportCategoryViewModel> GetByIdAsync(int id)
        {
            var category = await _context.ReportCategories.FindAsync(id);
            return category != null ? MapToViewModel(category) : null;
        }

        public async Task AddAsync(ReportCategoryViewModel vm)
        {
            var model = MapToModel(vm);
            await _context.ReportCategories.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ReportCategoryViewModel vm)
        {
            var existing = await _context.ReportCategories.FindAsync(vm.CategoryId);
            if (existing != null)
            {
                existing.Name = vm.Name;
                await _context.SaveChangesAsync();

            }
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.ReportCategories.FindAsync(id);
            if (category != null)
            {
                _context.ReportCategories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }





        public async Task<List<ReportCategoryDto>> GetDropdownAsync()
        {
            return await _context.ReportCategories
                .Select(c => new ReportCategoryDto
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name
                })
                .ToListAsync();
        }
    }
}
