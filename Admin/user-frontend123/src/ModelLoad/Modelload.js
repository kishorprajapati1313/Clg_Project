import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export const loadModel = (modelData, container) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.rotation.y = 45 / 180 * Math.PI;
  camera.position.set(8, 0, 20);
  // camera.position.set(8, 150, 20);                     //--------------------------------- mistake in the camera problem in blender -----------------
  // camera.position.set(800, 2000, 1500);

  // Create Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  ambientLight.position.set(100, 500, 40);
  scene.add(ambientLight);

  // Directional Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(100, 500, 40);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // const light1 = new THREE.PointLight(0xc4c4c4, 10);
  // light1.position.set(0, 300, 500);
  // scene.add(light1);

  // const light2 = new THREE.PointLight(0xc4c4c4, 10);
  // light2.position.set(500, 100, 0);
  // scene.add(light2);

  // const light3 = new THREE.PointLight(0xc4c4c4, 10);
  // light3.position.set(0, 100, -500);
  // scene.add(light3);

  // const light4 = new THREE.PointLight(0xc4c4c4, 10);
  // light4.position.set(-500, 300, 0);
  // scene.add(light4);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Control The Cloth Model
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Optional: Smoothly interpolate camera movement
  controls.dampingFactor = 0.25; // Optional: Adjust damping factor for smoother movement
  controls.rotateSpeed = 0.35; // Optional: Adjust rotation speed

  let userControlling = false;

  // Event listener for when the user starts controlling the model
  controls.addEventListener('start', () => {
    userControlling = true;
  });

  // Event listener for when the user stops controlling the model
  controls.addEventListener('end', () => {
    userControlling = false;
  });

  // Load model using FBXLoader
  const loader = new FBXLoader();
  let fbx;

  try {
    fbx = loader.parse(modelData);
    fbx.scale.set(30, 25, 30);
    scene.add(fbx);
    console.log("Model is loaded successfully");
  } catch (error) {
    console.error('Error parsing the model:', error);
    return;
  }

  // Define rotation animation parameters
  const rotationSpeed = 0.009;

  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the model only if the user is not controlling it
    if (!userControlling && fbx) {
      fbx.rotation.y += rotationSpeed;
    }

    // Update orbit controls
    controls.update();

    renderer.render(scene, camera);
  };

  animate();
};