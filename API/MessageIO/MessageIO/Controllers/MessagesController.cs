using MessageIO.Hubs;
using MessageIO.Models;
using MessageIO.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace MessageIO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IHubContext<ChatHub> _hubContext;

        public MessagesController(IMessageService messageService, IHubContext<ChatHub> hubContext)
        {
            _messageService = messageService;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Send(CreateMessageRequestDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest("Message content cannot be empty.");

            var result = await _messageService.SendMessageAsync(dto);

            await _hubContext.Clients.Group(dto.ConversationId.ToString())
                .SendAsync("ReceiveMessage", dto.SenderId, dto.Content);
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
