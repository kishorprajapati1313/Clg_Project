import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../S-Comp/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import Updateproduct from './Product/Updateproduct';


// ADD ANIMATION OF MUI WITH TransitionGroup
const Product = () => {
  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(true);
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const [SelectedProduct, setSelectedProduct] = useState(null)
  const [OpenModule, setOpenModule] = useState(false)

  const handleProductUpdated = () => {
    setReloadProducts(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'product_name', headerName: 'PRODUCT', flex: 0.5 },
    { field: 'desc', headerName: 'DESC', flex: 1, cellClassName: 'name-column--cell' },
    {
      field: 'img1',
      headerName: 'IMAGE',
      flex: 1,
      renderCell: (params) => (
        <img src={params.row.img1} alt={`${params.row.product_name}`} style={{ width: '90px', height: '120px', borderRadius: '100px' }} />
      ),
    },
    { field: 'cat', headerName: 'CATEGORY', flex: 1 },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      flex: 1,
      renderCell: (params) => (
        <>
          <UpgradeOutlinedIcon
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '30px', color: colors.greenAccent[500] }}
            onClick={() => handleUpdate(params.row)}
          />
          <DeleteOutlinedIcon
            style={{ cursor: 'pointer', fontSize: '30px', color: colors.redAccent[500] }}
            onClick={() => handleDelete(params.row)} />
        </>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1414/addproduct');
        const getproduct = response.data.map((product, index) => ({ ...product, id: index + 1 }));
        setProducts(getproduct);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    // Fetch products only when reloadProducts is true
    if (reloadProducts) {
      fetchProducts();
      setReloadProducts(false); // Set to false after fetching to prevent the loop
    }
  }, [reloadProducts]);
  

  const handleDelete = async (product) => {
    const productId = product._id.toString(); // Assuming the product object has an 'id' property
    try {
      await axios.delete(`http://localhost:1414/delete_product/${productId}`);
      setReloadProducts(true);
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };
  

  const handleUpdate = (product) => {
    setSelectedProduct(product)
    setOpenModule(true)
  }

  const handleCloseModel = () => {
    setSelectedProduct(null)
    setOpenModule(false)
  }
  

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Header */}
          <Header title="Product" subtitle="You can Update the Product" />
          {/* Button */}
          <Box>
            <Link to="/admin/product/addproduct">
              <button className="btn btn-primary">
                <AddOutlinedIcon /> Add Product
              </button>
            </Link>
          </Box>
        </Box>

        <Box m="40px 0 0 0" height="74vh" overflow="auto"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300]
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`
            }
          }}
        >
          {products.length > 0 ? (
            <DataGrid
              rows={products}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              className="datagrid-container"
              headerClassName="datagrid-header"
              cellClassName="datagrid-cell"
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </Box>
      </Box>

      {/* Update Product Modal */}
      <Updateproduct
        selectedproduct={SelectedProduct}
        close={handleCloseModel}
        open = {OpenModule}
        onProductUpdated={handleProductUpdated}
      />

    </>
  );
};

export default Product;