const API_URL = 'https://fakestoreapi.com';

async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        showMessage('Error fetching products: ' + error.message, 'error');
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
        productList.appendChild(productElement);
    });
}

async function addProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value
    };

    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const addedProduct = await response.json();
        showMessage('Product added successfully');
        getProducts();
    } catch (error) {
        showMessage('Error adding product: ' + error.message, 'error');
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Network response was not ok');
        showMessage('Product deleted successfully');
        getProducts();
    } catch (error) {
        showMessage('Error deleting product: ' + error.message, 'error');
    }
}

function showMessage(message, type = 'success') {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.style.display = 'block';
    setTimeout(() => messageElement.style.display = 'none', 3000);
}

document.getElementById('links').addEventListener('submit', addProduct);
getProducts();