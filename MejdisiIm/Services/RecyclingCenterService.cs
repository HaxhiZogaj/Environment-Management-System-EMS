using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Services
{
    public class RecyclingCenterService : IRecyclingCenterService
    {
        private readonly MejdisiImContext _context;
        private readonly IMapper _mapper;

        public RecyclingCenterService(MejdisiImContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private RecyclingCenter MapToModel(RecyclingCenterViewModel vm)
        {
            return new RecyclingCenter
            {
                CenterId = vm.CenterId,
                Name = vm.Name,
                Latitude = vm.Latitude,
                Longitude = vm.Longitude,
                Address = vm.Address,
                Contact = vm.Contact
            };
        }

        private RecyclingCenterViewModel MapToViewModel(RecyclingCenter model)
        {
            return new RecyclingCenterViewModel
            {
                CenterId = model.CenterId,
                Name = model.Name,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                Address = model.Address,
                Contact = model.Contact
            };
        }

        public async Task<List<RecyclingCenterViewModel>> GetAllAsync()
        {
            var centers = await _context.RecyclingCenters.ToListAsync();
            return centers.Select(MapToViewModel).ToList();
        }

        public async Task<RecyclingCenterViewModel> GetByIdAsync(int id)
        {
            var center = await _context.RecyclingCenters.FindAsync(id);
            return center != null ? MapToViewModel(center) : null;
        }

        public async Task AddAsync(RecyclingCenterViewModel vm)
        {
            var model = MapToModel(vm);
            await _context.RecyclingCenters.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(RecyclingCenterViewModel vm)
        {
            var existing = await _context.RecyclingCenters.FindAsync(vm.CenterId);
            if (existing != null)
            {
                var updated = MapToModel(vm);
                _mapper.Map(updated, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var center = await _context.RecyclingCenters.FindAsync(id);
            if (center != null)
            {
                _context.RecyclingCenters.Remove(center);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<RecyclingCenterDto>> GetDropdownAsync()
        {
            return await _context.RecyclingCenters
                .Select(c => new RecyclingCenterDto
                {
                    CenterId = c.CenterId,
                    Name = c.Name
                })
                .ToListAsync();
        }
    }
}
