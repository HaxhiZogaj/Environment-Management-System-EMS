using MejdisiIm.Models;
using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly MejdisiImContext _context;

    public ContactController(MejdisiImContext context)
    {
        _context = context;
    }



    [HttpPost]
    public async Task<IActionResult> PostMessage([FromBody] ContactMessage message)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Mesazhi u dërgua me sukses!" });
    }
}
