import React from "react";
import { useState } from "react";

function ProductPage() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g., add the product to a list.
        console.log(`Product Name: ${productName}, Quantity: ${quantity}`);
    };

    
    return (
        <div>
            <h1>Product Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div>
                    <label>Product Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default ProductPage;