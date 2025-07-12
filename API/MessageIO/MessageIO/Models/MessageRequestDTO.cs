namespace MessageIO.Models
{
    public class MessageRequestDTO
    {
        public int Id { get; set; }
        public Guid SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string Content { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
