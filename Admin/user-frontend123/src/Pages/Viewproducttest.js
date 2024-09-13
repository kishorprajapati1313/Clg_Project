// Viewproduct.js
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleproduct } from '../Store/Productslic';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import { cartadd } from '../Store/cartslice';
import { getuser } from '../Component/Navbar';
import { Skeleton } from '@mui/material';
import AlertPopup from '../Component/Aleart/Alertmess';
import { loadModel } from '../ModelLoad/Modelload';

const Viewproduct = () => {
  const containerRef = useRef();
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const { productid } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const [alertMessage, setAlertMessage] = useState({ message: '', severity: '', open: false });
  const [user, setuser] = useState(getuser());
  const [loading, setloading] = useState(true);
  const userid = user.user._id;
  // Assuming product is an object
  const { _id, product_name, desc, img1, price } = product || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(singleproduct(productid));
        setloading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setloading(false);
      }
    };

    fetchData();
  }, [dispatch, productid]);

  useEffect(() => {
    const loadModelData = async () => {
      try {
        const modelEndpoint = `http://localhost:1415/productmodel/${productid}`;
        const res = await fetch(modelEndpoint);

        if (!res.ok) {
          throw new Error(`Failed to fetch model. Status: ${res.status}`);
        }

        const fbxBuffer = await res.arrayBuffer();
        console.log("Model fetched successfully");
        setloading(false);

        // Check if the model data is valid
        if (!fbxBuffer || !fbxBuffer.byteLength) {
          console.error('Invalid binary code for the model');
          return;
        }

        loadModel(fbxBuffer, containerRef.current); // ------------------------------------------- Call the loadModel function
      } catch (error) {
        console.error('Error loading model:', error.message);
      }
    };

    loadModelData();
  }, [productid]);

  const handleSubmit = async () => {
    try {
      const response = await dispatch(cartadd({ userid, productid: _id }));
      console.log(response.error);
      if (response && response.error) {
        setAlertMessage({ message: "Product is already in cart", severity: 'error', open: true });
      } else {
        setAlertMessage({ message: "Product successfully added to cart", severity: 'success', open: true });
      }
    } catch (error) {
      console.error("Error dispatching cartadd:", error);
      setAlertMessage({ message: "Failed to add product", severity: 'error', open: true });
    }
  };

  return (
    <>
      {alertMessage.message && (
        <AlertPopup
          message={alertMessage.message}
          severity={alertMessage.severity}
          open={alertMessage.open}
          setOpen={setAlertMessage}
        />
      )}

      <div className="app" style={{ margin: "20px auto 90px", padding: '20px', maxWidth: '1200px', display: 'flex', backgroundColor: colors.grey[8000], height: "auto" }}>
        <div className="big-item" style={{ position: 'relative', transform: 'rotateY(20deg)', transition: 'transform 0.3s', flex: 1 }}>
          {!loading ? (
            <div ref={containerRef} style={{ width: '100%', height: '450px', borderRadius: '10px' }} />
          ) : (
            <Skeleton width={500} height={300} />
          )}
        </div>
        <div className="details" style={{ marginBottom: "20px", border: "2px solid grey", marginLeft: '20px', flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.primary[8000], }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: "10px", marginRight: "10px" }}>
            <h2 style={{ fontSize: '2.5rem', marginRight: '10px' }}>{product_name || <Skeleton width={200} />} </h2>
            <span style={{ fontSize: '1.2rem', color: colors.greenAccent[400], marginLeft: "auto" }}>${price || <Skeleton width={100} />}</span>
          </div>
          <p style={{ fontSize: '1rem', margin: '10px 10px ' }}>{desc || <Skeleton count={3} />}</p>
          <button onClick={handleSubmit}
            style={{ margin: '10px 10px ', fontSize: '1rem', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Media query for screens smaller than 600px */}
      <style>
        {`
          @media (max-width: 900px) {
            .app {
              flex-direction: column;
            }
            .big-item {
              margin-bottom: 20px;
              margin-left: 0;
              transform: none;
              width: 70%;
              height: auto;
            }
            .details {
              text-align: center;
            }
            h2 {
              font-size: 2rem;
            }
            span {
              font-size: 1rem;
            }
            p {
              font-size: 0.8rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Viewproduct;
