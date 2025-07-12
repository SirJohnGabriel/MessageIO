namespace MessageIO.Models
{
    public class CreateMessageRequestDTO
    {
        public Guid SenderId { get; set; }
        public int ConversationId { get; set; }
        public string Content { get; set; }
    }
}
