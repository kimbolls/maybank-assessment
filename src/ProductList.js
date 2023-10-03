import { useState, useEffect } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const styles = {
    customButton: {
        backgroundColor: '#ffc83d',
        color: 'black',
        border: 'none',
        '&:hover': {
            backgroundColor: '#ffc83d', // Keep the same background color on hover
            color: 'black', // Keep the same text color on hover
            border: 'none',
        },
    },
};




function ProductList({ products, onUpdateQuantity, onRemoveProduct }) {
    const [localProducts, setLocalProducts] = useState(products); // Define the local state
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const openDeleteDialog = (productId) => {
        setProductIdToDelete(productId);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setProductIdToDelete(null);
        setDeleteDialogOpen(false);
    };



    useEffect(() => {
        // Fetch products from the backend when the component mounts
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => setLocalProducts(data)) // Use setLocalProducts to update the local state
            .catch((error) => console.error('Error fetching products:', error));
    }, [products]);

    return (
        <div align="center">
            <Typography variant='h3' gutterBottom style={{ marginTop: '20px' }}>Product List</Typography>

            {localProducts.length === 0 ? ( // Check if the localProducts array is empty
                <><Typography variant='body1' style={{ marginTop: '20px' }}>No products yet</Typography> <br /><br /></>
            ) : (
                <TableContainer >
                    <Table component={Paper} align="center" sx={{ minWidth: 650, maxWidth: '70%' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell> Product Name</TableCell>
                                <TableCell align="center"> Quantity </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localProducts.map((product) => (
                                <StyledTableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {product.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton

                                            aria-label='RemoveCircleOutlineIcon'
                                            onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                                            disabled={product.quantity === 0}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                        {product.quantity}
                                        <IconButton
                                            aria-label='AddCircleOutlineIcon'
                                            onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                                        >
                                            <AddCircleOutline />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {product.quantity === 0 &&

                                            <Button
                                                component={Paper}
                                                sx={styles.customButton}
                                                variant="outlined"
                                                onClick={() => openDeleteDialog(product.id)}
                                            >
                                                Remove
                                            </Button>

                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table><br /><br />
                </TableContainer>
            )}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} sx={styles.customButton} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onRemoveProduct(productIdToDelete); // Call the remove product function
                            closeDeleteDialog(); // Close the dialog
                        }}
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProductList;
