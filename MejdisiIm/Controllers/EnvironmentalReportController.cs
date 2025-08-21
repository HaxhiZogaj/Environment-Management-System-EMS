// Sample controller for EnvironmentalReport
using AutoMapper;
using MejdisiIm.Services;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MejdisiIm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnvironmentalReportController : ControllerBase
    {
        private readonly IEnvironmentalReportService _service;

        public EnvironmentalReportController(IEnvironmentalReportService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reports = await _service.GetAllAsync();
            return Ok(reports);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var report = await _service.GetByIdAsync(id);
            if (report == null) return NotFound();
            return Ok(report);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(EnvironmentalReportViewModel model)
        {
            await _service.AddAsync(model);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EnvironmentalReportViewModel model)
        {
            if (id != model.ReportId) return BadRequest();
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

        [HttpGet("dropdown/categories")]
        public async Task<IActionResult> GetCategoriesDropdown()
        {
            var reportCategories = await _service.GetReportDropdownAsync();
            return Ok(reportCategories); // ✅
        }

    }
}
