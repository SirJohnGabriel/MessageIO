namespace MessageIO.Models.Domain
{
    public class Conversation
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<UserConversation> UserConversations { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
