document.addEventListener("DOMContentLoaded", () => {
    const greetingElement = document.getElementById("greeting");
    const cartCountElement = document.getElementById("cart-count");
    const orderItemsContainer = document.getElementById("order-items");
    const ordersOverlay = document.getElementById("ordersOverlay");
    const openOrdersLink = document.getElementById("open-orders-link");

    const currentHour = new Date().getHours();
    greetingElement.textContent = currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!";

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartCountElement.textContent = cartItems.length > 0 ? cartItems.length : "";

    function loadOrderItems() {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        orderItemsContainer.innerHTML = '';
        if (savedOrders.length === 0) {
            orderItemsContainer.innerHTML = `<tr><td colspan="5">No orders found.</td></tr>`;
            return;
        }
        savedOrders.forEach(order => {
            const row = document.createElement('tr');
            row.classList.add('order-item');
            row.innerHTML = `
                <td>
                    <img src="${order.image}" alt="${order.itemName}" class="order-item-image"> 
                    ${order.itemName} 
                </td>
                <td>${order.quantity}</td>
                <td>N ${order.unitPrice.toFixed(2)}</td>
                <td class="${order.status === 'Delivered' ? 'status-delivered' : 'status-cooking'}">${order.status}</td>
            `;
            orderItemsContainer.appendChild(row);
        });
    }

    openOrdersLink.addEventListener("click", (event) => {
        event.preventDefault();
        ordersOverlay.style.display = "flex";
        loadOrderItems();
    });

    ordersOverlay.addEventListener("dblclick", () => {
        ordersOverlay.style.display = "none";
    });

    window.removeOrderItem = function(orderId) {
        let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        savedOrders = savedOrders.filter(order => order.id !== orderId);
        localStorage.setItem("orders", JSON.stringify(savedOrders));
        loadOrderItems();
    };

    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
        ordersTable.innerHTML = '';
        orders.forEach(order => {
            const row = ordersTable.insertRow();
            row.insertCell(0).innerText = order.name;
            row.insertCell(1).innerHTML = `<img src="${order.image}" alt="${order.name}" width="50" height="50">`;
            row.insertCell(2).innerText = order.quantity;
            row.insertCell(3).innerText = order.price;
            row.insertCell(4).innerText = order.status;
        });
    }

    function updateOrderStatus() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        let hasChanges = false;
        orders.forEach(order => {
            const timeElapsed = (Date.now() - order.timeAdded) / 1000;
            if (timeElapsed > 300 && order.status !== "Delivered") {
                order.status = "Delivered";
                hasChanges = true;
            }
        });
        if (hasChanges) {
            localStorage.setItem('orders', JSON.stringify(orders));
            loadOrders();
        }
    }

    loadOrders();
    setInterval(updateOrderStatus, 1000);
});
