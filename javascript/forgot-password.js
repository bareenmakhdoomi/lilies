document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const mealName = button.parentElement.querySelector('h3').innerText;
            const mealPrice = button.parentElement.querySelector('p:last-of-type').innerText;
            const mealImage = button.parentElement.parentElement.querySelector('img').src;
            const meal = { name: mealName, price: mealPrice, image: mealImage };
            addToCart(meal);
        });
    });

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("greeting").innerText = `Good morning, ${user.name}!`;
    } else {
        window.location.href = "login.html";
    }

    function addToCart(meal) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.name === meal.name);
        if (existingItem) {
            existingItem.quantity += meal.quantity || 1;
        } else {
            meal.quantity = 1;
            cart.push(meal);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${meal.name} has been added to your cart!`);
        updateCartCount();
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(meal);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.getElementById("cart-count").innerText = cart.length > 0 ? `(${cart.length})` : '';
    }

    updateCartCount();

    const itemDetailOverlay = document.getElementById("itemDetailOverlay");
    const closeDetail = document.getElementById("closeDetail");
    const itemTitle = document.getElementById("itemTitle");
    const itemDescription = document.getElementById("itemDescription");
    const itemPrice = document.getElementById("itemPrice");
    const itemPrepTime = document.getElementById("itemPrepTime");
    const itemAvailability = document.getElementById("itemAvailability");
    const itemImage = document.getElementById("itemImage");
    const addToCartButton = document.getElementById("addToCartButton");
    const quantityElement = document.getElementById("quantity");

    let quantity = 1;

    document.querySelectorAll('.meal-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const description = card.getAttribute('data-description');
            const price = card.getAttribute('data-price');
            const prepTime = card.getAttribute('data-preptime');
            const availability = card.getAttribute('data-availability');
            const image = card.getAttribute('data-image');

            itemTitle.innerText = name || "No name available";
            itemDescription.innerText = description || "No description available";
            itemPrice.innerText = price || "No price available";
            itemPrepTime.innerText = prepTime || "No prep time available";
            itemAvailability.innerText = availability || "No availability data";
            itemImage.src = image || "default-image.jpg";
            quantity = 1;
            quantityElement.innerText = quantity;

            itemDetailOverlay.classList.add("active");
        });
    });

    itemDetailOverlay.addEventListener("click", (event) => {
        if (event.target === itemDetailOverlay) {
            closeOverlay();
        }
    });

    document.addEventListener("dblclick", closeOverlay);

    function closeOverlay() {
        itemDetailOverlay.classList.remove("active");
    }

    closeDetail.addEventListener("click", closeOverlay);

    document.getElementById("increaseQuantity").addEventListener("click", () => {
        quantity++;
        quantityElement.innerText = quantity;
    });
    document.getElementById("decreaseQuantity").addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityElement.innerText = quantity;
        }
    });

    addToCartButton.addEventListener("click", () => {
        const cartItem = {
            name: itemTitle.innerText,
            price: itemPrice.innerText,
            image: itemImage.src,
            quantity: quantity
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${itemTitle.innerText} has been added to your cart!`);
        closeOverlay();
        updateCartCount();
    });
});
