import React, { useEffect, useState } from 'react';
import { Box, Modal, Backdrop, Fade, Button, TextField, useTheme, FormControl, MenuItem, Select, InputLabel, Input, IconButton } from '@mui/material';
import { Theme } from '../../Theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const Updateproduct = ({ selectedproduct, close, open, onProductUpdated }) => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const [product, setproduct] = useState({ product_name: '', price: '', model: '', img1: '', desc: '', cat: 'other', sale_cat: 'other' });
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedproduct) {
      setproduct({
        product_name: selectedproduct.product_name, price: selectedproduct.price, model: selectedproduct.model,
        img1: selectedproduct.img1, desc: selectedproduct.desc, cat: selectedproduct.cat, sale_cat: selectedproduct.sale_cat
      });
    }
  }, [selectedproduct]);

  const handlechange = async (e) => {
    if (e.target.name === 'model') {
      // Update the 'model' property in the state with the file object
      setproduct({ ...product, model: e.target.files[0] });
    } else if (e.target.name === 'img1') {
      const file = e.target.files[0];
      if (file) {
        const base64String = await convertFileToBase64(file);
        setproduct({ ...product, img1: base64String });
      }
    } else {
      setproduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  

  const handleSubmit = async () => {
    try {
      // Remove the "data:image/png;base64," prefix from img1 before sending the request
      const updatedProduct = { ...product, img1: product.img1.split(',')[1] };

      const formData = new FormData();
        formData.append('product_name', product.product_name);
        formData.append('price', product.price);
        formData.append('model', product.model);
        formData.append('img1', updatedProduct.img1);
        formData.append('desc', product.desc);
        formData.append('cat', product.cat);
        formData.append('sale_cat', product.sale_cat);

      await axios.put(`http://localhost:1414/updateproduct/${selectedproduct._id}`, formData)
        .then(result => {
          console.log(result);
          navigate('/admin/product');
          onProductUpdated();
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.error("Error during form submission:", error);
    }
    close();
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setproduct({
          ...product,
          img1: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              backgroundColor: colors.grey[100], padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '700px', color: '#000', overflowY: 'auto', maxHeight: "80vh",
            }}
          >
            <IconButton style={{ position: 'absolute', top: '10px', right: '10px', color: colors.primary[400] }} onClick={close} >
              <CloseIcon />
            </IconButton>

            <h2 style={{ color: '#000' }}>Update the product</h2>
            <Box sx={{ mt: "20px" }}>
              <TextField name="product_name" label="Product Name" variant="outlined" fullWidth InputProps={{ style: { color: '#000', margin: '10px' }, }}
                value={product.product_name} onChange={handlechange} InputLabelProps={{ style: { color: '#000', margin: '10px' }, }}
              />
              <TextField name="price" label="Product Price" variant="outlined" fullWidth type="number" InputProps={{ style: { color: '#000', margin: '10px' }, }}
                value={product.price} onChange={handlechange} InputLabelProps={{ style: { color: '#000', margin: '10px' }, }}
              />
              <TextField name="desc" label="Product Description" variant="outlined" fullWidth InputProps={{ style: { color: '#000', margin: '10px' }, }}
                value={product.desc} onChange={handlechange} InputLabelProps={{ style: { color: '#000', margin: '10px' }, }}
              />

              <FormControl fullWidth variant="outlined" sx={{ mt: "10px" }}>
                <InputLabel htmlFor="product-category" style={{ color: '#000', margin: '10px' }}>
                  Product Category
                </InputLabel>
                <Select value={product.cat} onChange={handlechange} label="Product Category" inputProps={{ name: 'cat', id: 'product-category', }}
                  style={{ color: '#000', margin: '10px' }}
                >
                  <MenuItem value={product.cat} disabled>
                    {product.cat}
                  </MenuItem>
                  <MenuItem value="Shirt">Shirt</MenuItem>
                  <MenuItem value="Pants">Pants</MenuItem>
                  <MenuItem value="T-Shirt">T-Shirt</MenuItem>
                  <MenuItem value="Sweater">Sweater</MenuItem>
                  {/* Add more MenuItem components for each category */}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: "10px" }}>
                <InputLabel htmlFor="product-category" style={{ color: '#000', margin: '10px' }}>
                  Product Category
                </InputLabel>
                <Select value={product.sale_cat} onChange={handlechange} label="Product Category" inputProps={{ name: 'cat', id: 'product-category', }}
                  style={{ color: '#000', margin: '10px' }}
                >
                  <MenuItem value={product.sale_cat} disabled>
                    {product.sale_cat}
                  </MenuItem>
                  <MenuItem value="Winter">Winter</MenuItem>
                  <MenuItem value="Summare">Summare</MenuItem>
                  <MenuItem value="Monsoon">Monsoon</MenuItem>
                  {/* Add more MenuItem components for each category */}
                </Select>
              </FormControl>

              <Box sx={{ ml: "10px", color: '#000' }}>
                <label>Update the Image
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    sx={{ ml: "300px", color: "black" }}
                  />
                </label>
                <h6>Cuurent Photo

                  {product.img1 && (
                    <img
                      src={product.img1}
                      alt={`${product.product_name}`}
                      style={{ width: '25%', height: 'auto', borderRadius: '8px', marginLeft: "300px", border: "2px solid black" }}
                    />
                  )}

                </h6>
              </Box>
              <br />

              <Box sx={{ ml: "10px " }}>
                <label>Current Model:</label>
                <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{product.model ? product.model.name : ''}</span>
              </Box>
              <Box sx={{ ml: "10px" }}>
                <label>Update The Model:</label>
                <input type="file" id="productModel" name="model" onChange={handlechange} className="form-control" />
              </Box>


              {/* Add other form fields as needed */}
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: "10px", ml: '20px', backgroundColor: colors.greenAccent[700] }}>
                Update
              </Button>
              {/* Close Button */}
              <Button variant="contained" onClick={close} style={{ marginTop: '10px', marginLeft: '20px', backgroundColor: colors.redAccent[500] }} >
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Updateproduct;
