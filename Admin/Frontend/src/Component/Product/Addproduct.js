  import axios from 'axios';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { Theme } from '../../Theme';
  import { useTheme } from '@emotion/react';

  export const Addproduct = () => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode)
    const navigate = useNavigate();
    const [product, setProduct] = useState({ product_name: '', price: '', model: '', img1: '', desc: '', cat: 'other', sale_cat: 'other' });

    const handleInput = async (e) => {
      if (e.target.name === 'model') {
        setProduct({ ...product, [e.target.name]: e.target.files[0] });
      } else if (e.target.name === 'img1') {
        const file = e.target.files[0];
        if (file) {
          const base64String = await convertFileToBase64(file);
          setProduct({ ...product, img1: base64String });
        }
      } else {
        setProduct({ ...product, [e.target.name]: e.target.value });
      }
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


    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append('product_name', product.product_name);
        formData.append('price', product.price);
        formData.append('model', product.model);
        formData.append('img1', product.img1);
        formData.append('desc', product.desc);
        formData.append('cat', product.cat);
        formData.append('sale_cat', product.sale_cat);

        // console.log(formData.files)

        await axios.post('http://localhost:1414/addproduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(result => {
            // console.log(result);
            navigate('/admin/product');
          })
          .catch(error => console.log(error));
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    };


    return (
      <div className="container mt-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name:</label>
            <input type="text" id="productName" name="product_name" value={product.product_name} onChange={handleInput} className="form-control" />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Description:</label>
            <textarea id="productDescription" name="desc" onChange={handleInput} className="form-control" />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Price:</label>
            <input type="number" id="productPrice" name="price" value={product.price} onChange={handleInput} className="form-control" />
          </div>

          {/* 3D Model */}
          <div className="mb-3">
            <label htmlFor="productModel" className="form-label">3D Model:</label>
            <input type="file" id="productModel" name="model" onChange={handleInput} className="form-control" />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">Image:</label>
            <input type="file" id="productImage" name="img1" onChange={(e) => { handleInput(e) }} className="form-control" />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">Category:</label>
            <select id="productCategory" name="cat" onChange={handleInput} className="form-control">
              <option value="" disabled selected>Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pants">Pants</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Sweeter">Sweeter</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Sale_category */}
          <div className="mb-3">
            <label htmlFor="productSaleCategory" className="form-label">Sale Category:</label>
            <select id="productSaleCategory" name="sale_cat" onChange={handleInput} className="form-control">
              <option value="" disabled selected>Select The Sales Category</option>
              <option value="Winter">Winter</option>
              <option value="Summare">Summare</option>
              <option value="Monsoon">Monsoon</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    );
  };
