using MessageIO.Data;
using MessageIO.Models;
using MessageIO.Models.Domain;
using MessageIO.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MessageIO.Services.Implementations
{
    public class MessageService : IMessageService
    {
        private readonly AppDbContext _context;

        public MessageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MessageRequestDTO> SendMessageAsync(CreateMessageRequestDTO dto)
        {
            var message = new Message
            {
                SenderId = dto.SenderId,
                ConversationId = dto.ConversationId,
                Content = dto.Content,
                TimeStamp = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            var sender = await _context.Users.FindAsync(dto.SenderId);

            return new MessageRequestDTO
            {
                Id = message.Id,
                SenderId = message.SenderId,
                SenderUsername = sender?.Username,
                Content = message.Content,
                TimeStamp = DateTime.UtcNow
            };
        }

        public async Task<List<MessageRequestDTO>> GetMessageForConversationAsync(int conversationId)
        {
            return await _context.Messages
                .Where(m => m.ConversationId == conversationId)
                .OrderBy(m => m.TimeStamp)
                .Select(m => new MessageRequestDTO
                {
                    Id = m.Id,
                    SenderId = m.SenderId,
                    SenderUsername = m.Sender.Username,
                    Content = m.Content,
                    TimeStamp = m.TimeStamp
                })
                .ToListAsync();
        }
    }
}
