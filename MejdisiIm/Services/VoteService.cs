using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MejdisiIm.Services
{
    public class VoteService : IVoteService
    {
        private readonly MejdisiImContext _context;
        private readonly IMapper _mapper;

        public VoteService(MejdisiImContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private Vote MapToModel(VoteViewModel vm)
        {
            return new Vote
            {
                VoteId = vm.VoteId,
                ReportId = vm.ReportId,
                UserId = vm.UserId,
                VotedAt = vm.VotedAt
            };
        }

        private VoteViewModel MapToViewModel(Vote model)
        {
            return new VoteViewModel
            {
                VoteId = model.VoteId,
                ReportId = model.ReportId,
                UserId = model.UserId,
                VotedAt = model.VotedAt,
                FullName = model.User?.FullName,
                ReportTitle = model.Report?.Title
            };
        }

        public async Task<List<VoteViewModel>> GetAllAsync()
        {
            var votes = await _context.Votes.ToListAsync();
            return votes.Select(MapToViewModel).ToList();
        }

        public async Task<VoteViewModel> GetByIdAsync(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            return vote != null ? MapToViewModel(vote) : null;
        }

        public async Task AddAsync(VoteViewModel vm)
        {
            var model = MapToModel(vm);
            await _context.Votes.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(VoteViewModel vm)
        {
            var existing = await _context.Votes.FindAsync(vm.VoteId);
            if (existing != null)
            {
                var updated = MapToModel(vm);
                _mapper.Map(updated, existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var vote = await _context.Votes.FindAsync(id);
            if (vote != null)
            {
                _context.Votes.Remove(vote);
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
