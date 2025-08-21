using Microsoft.AspNetCore.Mvc;
using MejdisiIm.Services;
using MejdisiIm.ViewModels;
using MejdisiIm.Services.Interfaces;

namespace MejdisiIm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreenTipController : ControllerBase
    {
        private readonly IGreenTipService _service;

        public GreenTipController(IGreenTipService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost("Add")]
        public async Task<IActionResult> Add(GreenTipViewModel model)
        {
            await _service.AddAsync(model);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(GreenTipViewModel model)
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

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdown() => Ok(await _service.GetDropdownAsync());
    }

}