document.addEventListener("DOMContentLoaded", function () {
    const checkoutOverlay = document.getElementById("checkoutOverlay");
    const checkoutButton = document.getElementById("checkout-button");
    const makePaymentButton = document.getElementById("make-payment");

    const yourCartOverlay = document.getElementById("yourCartOverlay");

 
    checkoutButton.addEventListener("click", function (event) {
        event.preventDefault();
        checkoutOverlay.classList.add("open");
    });


    checkoutOverlay.addEventListener("click", function (event) {
        if (event.target === checkoutOverlay) {
            checkoutOverlay.classList.remove("open"); 
        }
    });


    makePaymentButton.addEventListener("click", function (e) {
        e.preventDefault(); 

 
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const ccv = document.getElementById("ccv").value;
        const pin = document.getElementById("pin").value;

        const cardNumberRegex = /^\d{16}$/;
        const expiryDateRegex = /^\d{2}\/\d{2}$/;
        const ccvRegex = /^\d{3}$/;
        const pinRegex = /^\d{4}$/;


        if (!cardNumberRegex.test(cardNumber)) {
            alert("Card number must be 16 digits.");
            return; 
        }
        if (!expiryDateRegex.test(expiryDate)) {
            alert("Expiry date must be in MM/YY format.");
            return;
        }
        if (!ccvRegex.test(ccv)) {
            alert("CCV must be 3 digits.");
            return;
        }
        if (!pinRegex.test(pin)) {
            alert("PIN must be 4 digits.");
            return;
        }

        alert("Payment made successfully!");


        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const orderItems = cartItems.map(item => ({
            ...item,
            status: "Cooking",        
            timeAdded: Date.now()     
        }));


        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...existingOrders, ...orderItems]));

 
        localStorage.removeItem("cartItems");

        setTimeout(() => {
            window.location.href = "orders.html"; 
        }, 0);
    });


    document.addEventListener("dblclick", function () {
        checkoutOverlay.classList.remove("open"); 
        yourCartOverlay.classList.add("open"); 
    });
});
