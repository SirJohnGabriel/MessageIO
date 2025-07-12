using MessageIO.Models;
using MessageIO.Models.Domain;

namespace MessageIO.Services.Interfaces
{
    public interface IMessageService
    {
        Task<MessageRequestDTO> SendMessageAsync(CreateMessageRequestDTO dto);
        Task<List<MessageRequestDTO>> GetMessageForConversationAsync(int conversationId);
    }
}
