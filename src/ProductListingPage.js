import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

function ProductListingPage() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const styles = {
        customButton: {
            backgroundColor: '#ffc83d',
            color: 'black',
            '&:hover': {
                backgroundColor: '#ffc83d', // Keep the same background color on hover
                color: 'black', // Keep the same text color on hover
            },
        },
    };

    // Function to handle adding a new product
    function handleAddProduct(newProduct) {
        if (newProduct.name && newProduct.quantity) {
            // Send the new product data to the backend
            fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Update the local state with the response data (if needed)
                    setProducts([...products, data]);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error adding product:', error);
                });
            closeModal();
        }
    }

    // Function to handle removing a product by ID
    function handleRemoveProduct(productId) {
        // Make a DELETE request to the API endpoint
        fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // If the request was successful, update the local state
                    // Remove the product from the local state
                    const updatedProducts = products.filter((product) => product.id !== productId);
                    setProducts(updatedProducts);
                    console.log('Product Deleted Successfully')
                } else {
                    console.error('Failed to delete product');
                }
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    }


    // Function to handle changing the quantity of a product
    function handleQuantityChange(productId, newQuantity) {
        // Prepare the data for the PUT request
        const updatedProductData = {
            quantity: newQuantity,
        };

        // Make a PUT request to update the quantity
        fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProductData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the local state with the updated product data
                setProducts((prevProducts) => {
                    return prevProducts.map((product) => {
                        if (product.id === productId) {
                            return { ...product, quantity: data.quantity };
                        }

                        return product;
                    });
                });
            })
            .catch((error) => {
                console.error('Error updating product quantity:', error);
            });
    }

    return (
        <div align='center'>
            <ProductList
                products={products}
                onUpdateQuantity={handleQuantityChange}
                onRemoveProduct={handleRemoveProduct}
            />
            <Button variant='contained' sx={styles.customButton} size='large' endIcon={<AddCircleOutlineIcon />} onClick={openModal}>
                Add Product
            </Button>
            <AddProductModal isOpen={isModalOpen} onClose={closeModal} onAddProduct={handleAddProduct} />
        </div>
    );
}

export default ProductListingPage;
