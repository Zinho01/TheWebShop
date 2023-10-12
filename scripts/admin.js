// Function to add an order to localStorage
function addOrderToLocalStorage(order) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(order);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove an order from localStorage by ID
function removeOrderFromLocalStorage(orderId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(order => order.id !== orderId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}


// Function to count the number of orders in localStorage
function countOrdersInLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length;
}

// Update order count
function updateOrderCount() {
    const count = countOrdersInLocalStorage();
    document.getElementById('orderCount').textContent = count;
}

// Event listener for adding an order
document.getElementById('addOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderName = document.getElementById('orderName').value;
    const orderBrand = document.getElementById('orderBrand').value;
    const orderColor = document.getElementById('orderColor').value;

    // Generate a unique ID (you can use a better method for this)
    const orderId = Date.now().toString();

    const order = {
        id: orderId,
        name: orderName,
        brand: orderBrand,
        color: orderColor
    };

    addOrderToLocalStorage(order);
    updateOrderCount();

    document.getElementById('addOrderForm').reset();
});

// Event listener for removing an order
document.getElementById('removeOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderId = document.getElementById('orderId').value;

    removeOrderFromLocalStorage(orderId); // Remove the order with the specified ID
    updateOrderCount();
    displayOrdersInTable(); // Update the order table

    // Clear the form
    document.getElementById('removeOrderForm').reset();
});


// Function to display orders in the HTML table
function displayOrdersInTable() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.getElementById('orderTableBody');
    tableBody.innerHTML = ''; // Clear the existing table

    cart.forEach(order => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = order.id;
        row.insertCell(1).textContent = order.name;
        row.insertCell(2).textContent = order.brand;
        row.insertCell(3).textContent = order.color;
    });
}

// Update order count and the order table
function updatePage() {
    updateOrderCount();
    displayOrdersInTable();
}

// Initial update
updatePage();


// Initial count update
updateOrderCount();

