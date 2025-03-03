

document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category");
    const products = document.querySelectorAll(".product");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = [];

    categories.forEach(category => {
        category.addEventListener("click", function () {
            categories.forEach(cat => cat.classList.remove("active"));
            this.classList.add("active");
            let selectedCategory = this.dataset.category;
            products.forEach(product => {
                product.style.display = selectedCategory === "all" || product.dataset.category === selectedCategory ? "block" : "none";
            });
        });
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.dataset.name;
            let price = parseInt(this.dataset.price);
            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            let li = document.createElement("li");
            li.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total;
    }
});