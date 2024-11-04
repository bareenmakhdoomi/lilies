document.addEventListener("DOMContentLoaded", function () {
    const cartOverlay = document.getElementById("cartOverlay");
    const cartLink = document.getElementById("cart-link");
    const cartItemsContainer = document.getElementById('cart-items');


    cartLink.addEventListener("click", function (event) {
        event.preventDefault(); 
        cartOverlay.classList.add("open"); 
        loadCartItems(); 
    });

    cartOverlay.addEventListener("click", function (event) {
        if (event.target === cartOverlay) {
            cartOverlay.classList.remove("open");
        }
    });


    function loadCartItems() {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = ''; 

        if (savedCart.length === 0) {
            cartItemsContainer.innerHTML = `<tr><td colspan="4">Your cart is empty.</td></tr>`;
            document.getElementById('cart-total').textContent = 'NGN 0.00';
            return;
        }

        savedCart.forEach((item, index) => {
            const subtotal = item.quantity * parseFloat(item.price.replace(/NGN |,/g, ''));
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" style="inline-size: 50px; vertical-align: middle; margin-inline-end: 10px;">
                    <span>${item.name}</span>
                    </br><button class="remove-item" style="color: red; border: none; cursor: pointer;" data-index="${index}">Remove</button>
                </td>
                <td>
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </td>
                <td>${item.price}</td>
                <td>NGN ${subtotal.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        updateTotalPrice(savedCart);
        attachListeners();
    }

    function attachListeners() {
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'));
                updateQuantity(index, 1);
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'));
                updateQuantity(index, -1);
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                removeItemFromCart(index);
            });
        });
    }

    function updateQuantity(index, change) {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (savedCart[index]) {
            savedCart[index].quantity = Math.max(1, savedCart[index].quantity + change);
            localStorage.setItem("cart", JSON.stringify(savedCart));
            loadCartItems();
        }
    }

    function removeItemFromCart(index) {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        savedCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(savedCart));
        loadCartItems();
    }

    function updateTotalPrice(cart) {
        const totalPrice = cart.reduce((total, item) => {
            const priceValue = parseFloat(item.price.replace(/NGN |,/g, ''));
            return total + (priceValue * item.quantity);
        }, 0);
        document.getElementById('cart-total').textContent = `NGN ${totalPrice.toFixed(2)}`;
    }

    document.getElementById("checkout-button").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
});
