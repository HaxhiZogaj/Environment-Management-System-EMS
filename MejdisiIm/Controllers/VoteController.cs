using Microsoft.AspNetCore.Mvc;
using MejdisiIm.Services;
using MejdisiIm.ViewModels;
using MejdisiIm.Services.Interfaces;

namespace MejdisiIm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IVoteService _service;

        public VoteController(IVoteService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost("Add")]
        public async Task<IActionResult> Add(VoteViewModel model)
        {
            await _service.AddAsync(model);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(VoteViewModel model)
        {
            await _service.UpdateAsync(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }


        [HttpGet("dropdown/users")]
        public async Task<IActionResult> GetUsersDropdown()
        {
            var users = await _service.GetUsersDropdownAsync();
            return Ok(users);
        }

        [HttpGet("dropdown/reports")]
        public async Task<IActionResult> GetReportsDropdown()
        {
            var reports = await _service.GetReportsDropdownAsync();
            return Ok(reports); // ✅
        }


        //[HttpGet("dropdown")]
        //public async Task<IActionResult> GetDropdown() => Ok(await _service.GetDropdownAsync());
    }
}
