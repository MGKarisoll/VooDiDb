using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace VooDiDb.Api {
    [HubName("chat")]
    public class ChatHub : Hub {
        public void Hello() {
            this.Clients.All.hello();
        }

        public override Task OnConnected() {
            this.Clients.Caller.joinRoom("atata");
            return base.OnConnected();
        }
    }
}
