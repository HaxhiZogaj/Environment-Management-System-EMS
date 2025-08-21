using MejdisiIm.Services.Interfaces;
using MejdisiIm.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MejdisiIm.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportCategoryController : ControllerBase
    {
        private readonly IReportCategoryService _service;

        public ReportCategoryController(IReportCategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ReportCategoryViewModel>>> GetAll()
        {
            var categories = await _service.GetAllAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReportCategoryViewModel>> GetById(int id)
        {
            var category = await _service.GetByIdAsync(id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost("Add")]
        public async Task<ActionResult> Add([FromBody] ReportCategoryViewModel model)
        {
            await _service.AddAsync(model);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ReportCategoryViewModel model)
        {
            if (id != model.CategoryId)
                return BadRequest("ID mismatch");

            await _service.UpdateAsync(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }

        //[HttpGet("dropdown")]
        //public async Task<ActionResult> GetDropdown()
        //{
        //    var result = await _service.GetDropdownAsync();
        //    return Ok(result);
        //}
    }
}
