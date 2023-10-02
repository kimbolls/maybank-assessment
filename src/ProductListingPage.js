import React, { useState, useEffect } from 'react';

function ProductListingPage() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '' });

    useEffect(() => {
        // Retrieve data from localStorage when the component mounts
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
        console.log(storedProducts)
    }, []);

    // Function to handle adding a new product
    function addProduct() {
        if (newProduct.name && newProduct.quantity) {
            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts);

            // Update localStorage
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            // Clear the input fields
            setNewProduct({ name: '', quantity: '' });
        }
    }

    return (
        <div>
            <h1>Product Listing Page</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.name} - Quantity: {product.quantity}
                    </li>
                ))}
            </ul>

            {/* Form for adding a new product */}
            <div>
                <h2>Add a New Product</h2>
                <form>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder='Product Name'
                        />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            value={newProduct.quantity}
                            onChange={(e) => {
                                // 
                                const newValue = Math.max(1, parseInt(e.target.value, 10));
                                setNewProduct({ ...newProduct, quantity: newValue });
                            }}
                            placeholder='1'
                            min="1"
                        />
                    </div>
                    <button type="button" onClick={addProduct}>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductListingPage;
