using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Services
{
    public class GreenTipService : IGreenTipService
    {
        private readonly MejdisiImContext _context;
        private readonly IMapper _mapper;

        public GreenTipService(MejdisiImContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private GreenTip MapToModel(GreenTipViewModel vm)
        {
            return new GreenTip
            {
                TipId = vm.TipId,
                Title = vm.Title,
                Content = vm.Content,
                Category = vm.Category
            };
        }

        private GreenTipViewModel MapToViewModel(GreenTip model)
        {
            return new GreenTipViewModel
            {
                TipId = model.TipId,
                Title = model.Title,
                Content = model.Content,
                Category = model.Category
            };
        }

        public async Task<List<GreenTipViewModel>> GetAllAsync()
        {
            var tips = await _context.GreenTips.ToListAsync();
            return tips.Select(MapToViewModel).ToList();
        }

        public async Task<GreenTipViewModel> GetByIdAsync(int id)
        {
            var tip = await _context.GreenTips.FindAsync(id);
            return tip != null ? MapToViewModel(tip) : null;
        }

        public async Task AddAsync(GreenTipViewModel vm)
        {
            var model = MapToModel(vm);
            await _context.GreenTips.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(GreenTipViewModel vm)
        {
            var existing = await _context.GreenTips.FindAsync(vm.TipId);
            if (existing != null)
            {
                var updated = MapToModel(vm);
                _mapper.Map(updated, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var tip = await _context.GreenTips.FindAsync(id);
            if (tip != null)
            {
                _context.GreenTips.Remove(tip);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<GreenTipDto>> GetDropdownAsync()
        {
            return await _context.GreenTips
                .Select(t => new GreenTipDto
                {
                    TipId = t.TipId,
                    Title = t.Title
                })
                .ToListAsync();
        }
    }
}
