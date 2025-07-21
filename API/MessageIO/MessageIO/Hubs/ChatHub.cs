using Microsoft.AspNetCore.SignalR;

namespace MessageIO.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string conversationId, string user, string message)
        {
            await Clients.Group(conversationId).SendAsync("ReceiveMessage", user, message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public async Task JoinConversation(string conversationId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);
        }

        public async Task LeaveConversation(string conversationId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversationId);
        }
    }
}
