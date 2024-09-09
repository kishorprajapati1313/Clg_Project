//It is not that much Good 
//testing of First model

//main:-1
import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let mouseX = 0;
let mouseY = 0;
let controls;

const loader = new FBXLoader();

const loadFBXModel = (modelPath, scene) => {
  loader.load(modelPath, (fbxModel) => {
    scene.add(fbxModel);
    object = fbxModel; // Store the loaded object for manipulation
  });
};

const modelPath = './3d-model/Aj.fbx';
loadFBXModel(modelPath, scene);

const renderer = new Three.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3d").appendChild(renderer.domElement);

camera.position.z = 500;

const topLight = new Three.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new Three.AmbientLight(0x404040, 3); // Adjust ambient light color
scene.add(ambientLight);

// Add hemisphere light for ambient lighting
const hemisphereLight = new Three.HemisphereLight(0xffffff, 0x404040, 1);
scene.add(hemisphereLight);

// Set background color to light gray
renderer.setClearColor(0xeeeeee);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1; // Adjust damping factor for smoother rotation
controls.rotateSpeed = 0.5; // Adjust rotation speed
controls.zoomSpeed = 0.5; // Adjust zoom speed

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  if (object) {
    object.rotation.y += 0.005; // Rotate continuously
    object.rotation.y += mouseX * 0.01; // Adjust rotation speed based on mouse movement
    object.rotation.x += mouseY * 0.01;
  }

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.update(); // Update controls on window resize
});

animate();
