// AddProductModal.js
import React, { useState } from 'react';
import { Modal, Typography, Button, TextField, } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddProductModal({ isOpen, onClose, onAddProduct }) {
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '1' });

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.quantity) {
            onAddProduct(newProduct);
            setNewProduct({ name: '', quantity: '1' });
            onClose();
        }
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
    return (
        <Modal align='center' open={isOpen} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px' }}>
                <Typography variant='h4' gutterBottom>Add a New Product</Typography>
                <TextField
                    label='Product Name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Quantity'
                    type='number'
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: Math.max(1, Math.floor(e.target.value)) })}
                    fullWidth
                    step='1'
                    margin='normal'
                />
                <Button sx={styles.customButton} variant='contained' color='primary' onClick={handleAddProduct} endIcon={<AddCircleOutlineIcon />}>Add Product</Button>
            </div>
        </Modal>
    );
}

export default AddProductModal;
