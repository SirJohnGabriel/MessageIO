namespace MessageIO.Models.Domain
{
    public class UserConversation
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
    }
}
