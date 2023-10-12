document.addEventListener("DOMContentLoaded", () => {
    fetch("json/phones.json")
        .then((response) => response.json())
        .then((jsonData) => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const ProductContainer = document.getElementById("products");
            const FilterButtonsContainer =
                document.getElementById("filter-buttons");
            const filterButtons = [
                "All",
                "Apple",
                "Samsung",
                "Nokia",
                "Motorola",
            ];

            function updateCartCount() {
                const productCart = document.getElementById("productCart");
                productCart.textContent = cart.length;
            }

            updateCartCount();

            filterButtons.forEach((brand) => {
                const button = document.createElement("button");
                button.textContent = brand;
                FilterButtonsContainer.appendChild(button);

                button.addEventListener("click", () => {
                    filterProducts(jsonData, brand);
                });
            });
            // with this function you can filter all the phones
            function filterProducts(data, brand) {
                ProductContainer.innerHTML = "";

                for (let i = 0; i < data.length; i++) {
                    if (brand === "All" || data[i].brand === brand) {
                        const card = document.createElement("div");
                        card.classList.add("card");

                        const productName = document.createElement("h2");
                        productName.textContent = "Name: " + data[i].name;

                        const productImg = document.createElement("img");
                        productImg.src = data[i].img;
                        productImg.classList.add("product-image");

                        const productBrand = document.createElement("h2");
                        productBrand.textContent = "Brand: " + data[i].brand;

                        const productPrice = document.createElement("p");
                        productPrice.textContent =
                            "Price: $" + data[i].price.toFixed(2);

                        const productColor = document.createElement("h3");
                        productColor.textContent = "Color: " + data[i].color;

                        const addToCartButton =
                            document.createElement("button");
                        addToCartButton.textContent = "Add to Cart";
                        addToCartButton.classList.add("addToCart");

                        addToCartButton.addEventListener("click", () => {
                            // Push the product data to the cart
                            cart.push(data[i]);

                            // Update the cart count
                            updateCartCount();

                            // Save the cart to local storage
                            localStorage.setItem("cart", JSON.stringify(cart));
                        });

                        card.appendChild(productName);
                        card.appendChild(productImg);
                        card.appendChild(productBrand);
                        card.appendChild(productPrice);
                        card.appendChild(productColor);
                        card.appendChild(addToCartButton);

                        ProductContainer.appendChild(card);
                    }
                }
            }

            filterProducts(jsonData, "All");
        });
});
