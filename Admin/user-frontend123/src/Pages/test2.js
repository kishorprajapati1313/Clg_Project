import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

const Test2 = () => {
    const dispatch = useDispatch();
    const productModel = useSelector((state) => state.product);
    const containerRef = useRef();
    const productId = "65c8b9fb5bd4294ef125e355";

    useEffect(() => {
        const loadModelData = async () => {
            try {
                // Adjust the URL to match your backend API endpoint
                const modelEndpoint = `http://localhost:1415/productmodel/${productId}`;

                // Fetch the model from the backend
                const response = await fetch(modelEndpoint);

                if (!response.ok) {
                    throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
                }

                const fbxBuffer = await response.arrayBuffer();
                console.log('Model data fetched successfully:', fbxBuffer);

                // Check if the model data is valid
                if (!fbxBuffer || !fbxBuffer.byteLength) {
                    console.error('Invalid binary code for the model');
                    return;
                }

                loadModel(fbxBuffer, containerRef.current);
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModelData(); // Call the function to load the model
    }, [productId]);

    const loadModel = (modelData, container) => {
        console.log('Attempting to load model...');
      
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);
      
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(8, 100, 100)

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
      
        const loader = new FBXLoader();
      
        try {
          // Use FBXLoader.parse directly
          const fbx = loader.parse(modelData);
          scene.add(fbx);
      
          console.log('Model loaded successfully:', fbx);
        } catch (error) {
          console.error('Error parsing the model:', error);
          return;
        }
      
        camera.position.z = 60;
      
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
      
        animate();
      };
      
    
    return <div ref={containerRef} style={{ width: '30%', height: '30%' }} />;
};

export default Test2;
