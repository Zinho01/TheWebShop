document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    // Function to calculate the total price
    function calculateTotal() {
        let total = 0;
        cartItems.innerHTML = "";

        for (const item of cart) {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            const priceCell = document.createElement("td");
            priceCell.textContent = `$${item.price.toFixed(2)}`;

            total += item.price;
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            cartItems.appendChild(row);
        }

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    calculateTotal();

    // Checkout button click event
    checkoutButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cartItems.innerHTML = "";
        cartTotal.textContent = "$0.00";
        alert("Payment Successful");
    });
});
