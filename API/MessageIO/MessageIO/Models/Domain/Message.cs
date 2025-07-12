namespace MessageIO.Models.Domain
{
    public class Message
    {
        public int Id { get; set; }
        
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        

        public Guid SenderId { get; set; }
        public User Sender { get; set; }

        public string Content { get; set; }
        public string? MediaUrl { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}
