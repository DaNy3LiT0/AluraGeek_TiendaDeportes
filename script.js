const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById('product-name').value, 
        brand: document.getElementById('product-brand').value,
        model: document.getElementById('product-model').value,
        sport: document.getElementById('product-sport').value,
        price: parseFloat(document.getElementById('product-price').value).toFixed(2),
        image: document.getElementById('product-image').value,
    };

    // Enviar producto a json-server
    await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    // Actualizar lista
    loadProducts();
    form.reset();
});

async function loadProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();

    productList.innerHTML = products.map((product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.model}">
            <h3>${product.model}</h3>
            <p><strong>Marca:</strong> ${product.brand}</p>
            <p><strong>Deporte:</strong> ${product.sport}</p>
            <p class="price"><strong>Precio:</strong> $${product.price}</p>
        </div>
    `).join('');
}

// Cargar productos al iniciar
loadProducts();
