using MessageIO.Data;
using MessageIO.Models;
using MessageIO.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace MessageIO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConversationsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/conversations
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateConversationRequestDTO dto)
        {
            if (dto.ParticipantUserIds == null || dto.ParticipantUserIds.Count < 2)
                return BadRequest("At least 2 users are required to create a conversation.");

            var existingConversation = await _context.Conversations
                .Include(c => c.UserConversations)
                .FirstOrDefaultAsync(c =>
                    c.UserConversations.Count == dto.ParticipantUserIds.Count &&
                    c.UserConversations.All(uc => dto.ParticipantUserIds.Contains(uc.UserId)));

            if (existingConversation != null)
            {
                return Ok(new
                {
                    existing = true,
                    conversationId = existingConversation.Id
                });
            }

            var conversation = new Conversation();
            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();

            foreach (var userId in dto.ParticipantUserIds)
            {
                _context.UserConversations.Add(new UserConversation
                {
                    ConversationId = conversation.Id,
                    UserId = userId
                });
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                existing = false,
                conversationId = conversation.Id
            });
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserConversations(Guid userId)
        {
            var conversations = await _context.UserConversations
                .Where(uc => uc.UserId == userId)
                .Include(uc => uc.Conversation)
                .ThenInclude(c => c.UserConversations)
                .ThenInclude(uc => uc.User)
                .Select(uc => new
                {
                    ConversationId = uc.ConversationId,
                    Participants = uc.Conversation.UserConversations.Select(p => new
                    {
                        p.UserId,
                        p.User.Username
                    })
                })
                .ToListAsync();

            return Ok(conversations);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var conversations = _context.Conversations
                .Include(c => c.UserConversations)
                    .ThenInclude(uc => uc.User)
                .Include(c => c.Messages)
                .Select(c => new ConversationRequestDTO
                {
                    Id = c.Id,
                    Participants = c.UserConversations.Select(uc => new ParticipantRequestDTO
                    {
                        UserId = uc.UserId,
                        Username = uc.User.Username,
                        AvatarUrl = uc.User.AvatarUrl
                    }).ToList(),
                    LastMessage = c.Messages
                        .OrderByDescending(m => m.TimeStamp)
                        .Select(m => new MessageRequestDTO
                        {
                            Id = m.Id,
                            SenderId = m.SenderId,
                            SenderUsername = m.Sender.Username,
                            Content = m.Content,
                            TimeStamp = m.TimeStamp
                        })
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(conversations);
        }
    }
}
