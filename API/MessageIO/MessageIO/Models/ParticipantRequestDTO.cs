namespace MessageIO.Models
{
    public class ParticipantRequestDTO
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
