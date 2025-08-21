using Microsoft.AspNetCore.Mvc;
using MejdisiIm.Services;
using MejdisiIm.ViewModels;
using MejdisiIm.Services.Interfaces;
using MejdisiIm.DTOs;

namespace MejdisiIm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var comment = await _service.GetByIdAsync(id);
            if (comment == null)
                return NotFound();
            return Ok(comment);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] CommentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _service.AddAsync(model);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CommentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != model.CommentId)
                return BadRequest("Id në URL nuk përputhet me modelin.");

            try
            {
                await _service.UpdateAsync(model);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
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


    }
}