import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { singleproductmodel } from '../Store/Productslic';
import axios from 'axios';

const Test = ({ productId = "65c8b9fb5bd4294ef125e355" }) => {
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.product);
  const { model } = models || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("mount");
        const response = await axios.get(`http://localhost:1415/productmodel/${productId}`);
        const modelData = response.data;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        // Set containerWidth and containerHeight to smaller values
        const containerWidth = 300;
        const containerHeight = 200;

        renderer.setSize(containerWidth, containerHeight);
        document.getElementById('container3d').appendChild(renderer.domElement);

        // Set background color to dark
        renderer.setClearColor(0x222222);

        camera.position.z = 5;

        const loader = new FBXLoader();

        if (modelData) {
          const shineMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0,
            emissive: 0xaaaaaa,
          });
          console.log(modelData)

          // Load FBX model with console logs
          loader.load(modelData, (object) => {
            console.log("Model loaded successfully");

            object.traverse((child) => {
              if (child.isMesh) {
                child.material = shineMaterial;
              }
            });

            // Position the model so that it's visible in the camera view
            object.position.set(0, 0, 0);

            scene.add(object);

            // Animation
            const animateModel = () => {
              // Add animation logic here

              // Rotate the model during animation
              scene.children.forEach((object) => {
                if (object.isMesh) {
                  object.rotation.y += 0.01;
                }
              });
            };

            const animate = () => {
              requestAnimationFrame(animate);
              animateModel();
              renderer.render(scene, camera);
            };

            animate();
          }, (progressEvent) => {
            console.log((progressEvent.loaded / progressEvent.total) * 100 + '% loaded');
          }, (error) => {
            console.error("Error loading model:", error);
          });

        } else {
          console.log("Model data is undefined");
          dispatch(singleproductmodel(productId));
        }

        // Clean up function
        return () => {
          console.log("Component unmounted");
          renderer.dispose();
        };
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  return (
    <div>
      <h1>3D Model Viewer</h1>
      <main>
        <div id="container3d" style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}></div>
      </main>
    </div>
  );
};

export default Test;
