using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }


        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();

            await Clients.All.SendAsync("UpdateUsers", _pizzaManager.NbConnectedUsers);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();

            await Clients.All.SendAsync("UpdateUsers", _pizzaManager.NbConnectedUsers);

            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            var group = _pizzaManager.GetGroupName(choice);

            var nbPizza = _pizzaManager.NbPizzas[(int)choice];

            var nbMoney = _pizzaManager.Money[(int)choice];

            var price = _pizzaManager.PIZZA_PRICES[(int)choice];

            await Groups.AddToGroupAsync(Context.ConnectionId, group);

            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney", nbPizza, nbMoney);

            await Clients.Caller.SendAsync("UpdatePizzaPrice", price);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
             var group = _pizzaManager.GetGroupName(choice);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);

            var group = _pizzaManager.GetGroupName(choice);

            var nbMoney = _pizzaManager.Money[(int)choice];

            await Clients.Group(group).SendAsync("UpdateMoney", nbMoney);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);

            var group = _pizzaManager.GetGroupName(choice);

            var nbPizza = _pizzaManager.NbPizzas[(int)choice];

            var nbMoney = _pizzaManager.Money[(int)choice];

            await Clients.Group(group).SendAsync("UpdateNbPizzasAndMoney", nbPizza,nbMoney);
        }
    }
}
