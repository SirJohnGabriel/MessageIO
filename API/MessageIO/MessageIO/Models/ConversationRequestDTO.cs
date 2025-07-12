namespace MessageIO.Models
{
    public class ConversationRequestDTO
    {
        public int Id { get; set; }
        public List<ParticipantRequestDTO> Participants { get; set; }
        public MessageRequestDTO? LastMessage { get; set; }
    }
}
