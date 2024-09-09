import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { FBXLoader } from 'three/addons/loaders/FBXLoader';

function load3DModel() {
  let scene, camera, renderer, object, controls;

  scene = new Three.Scene()
  scene.background = new Three.Color(0xdddddd)

  camera = new Three.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.y = (45 / 180) * Math.PI
  camera.position.set(800, 100, 1000)

  setupLights()
  setupRenderer()

  controls = new OrbitControls(camera, renderer.domElement);

  let loader = new FBXLoader();

  loader.load('./3d-model/Aj.fbx', (fbxmodel) => {
    fbxmodel.scale.set(1, 1, 1);
    fbxmodel.castShadow = true;
    scene.add(fbxmodel);

    animate();
  });

  function setupLights() {
    const topLight = new Three.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new Three.AmbientLight(0x404040, 3); // Adjust ambient light color
    scene.add(ambientLight);

    // Add hemisphere light for ambient lighting
    const hemisphereLight = new Three.HemisphereLight(0xffffff, 0x404040, 1);
    scene.add(hemisphereLight);
  }

  function setupRenderer() {
    renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container3d").appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);

    if (object) {
      // Adjust rotation based on user interaction
      object.rotation.y += controls.mouseX * 0.01;
      object.rotation.x += controls.mouseY * 0.01;
    }
    
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.update();
  });
}

// Call the function to load the 3D model
load3DModel();
