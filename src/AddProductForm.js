// AddProductForm.js
import React, { useState } from 'react';

function AddProductForm({ onAddProduct }) {
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '' });

    function handleAddProduct() {
        // Validate and handle adding a new product
        if (newProduct.name && newProduct.quantity) {
            onAddProduct(newProduct);
            setNewProduct({ name: '', quantity: '' });
        }
    }

    return (
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
                            const newValue = Math.max(1, parseInt(e.target.value, 10));
                            setNewProduct({ ...newProduct, quantity: newValue });
                        }}
                        placeholder='1'
                        min="1"
                    />
                </div>
                <button type="button" onClick={handleAddProduct}>
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProductForm;
