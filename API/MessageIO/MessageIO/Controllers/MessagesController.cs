using MessageIO.Models;
using MessageIO.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MessageIO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost]
        public async Task<IActionResult> Send(CreateMessageRequestDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest("Message content cannot be empty.");

            var result = await _messageService.SendMessageAsync(dto);
            return Ok(result);
        }

        [HttpGet("{conversationId}")]
        public async Task<IActionResult> Get(int conversationId)
        {
            var message = await _messageService.GetMessageForConversationAsync(conversationId);
            return Ok(message);
        }
    }
}
