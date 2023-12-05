import "./style.css";
import * as THREE from "three";
// import GLTFLoader for loading models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "/cubemap/px.png",
  "/cubemap/nx.png",
  "/cubemap/py.png",
  "/cubemap/ny.png",
  "/cubemap/pz.png",
  "/cubemap/nz.png",
]);

scene.background = environmentMapTexture;

// add controls
const controls = new OrbitControls(camera, renderer.domElement);

const gltfLoader = new GLTFLoader();

// load models/biker_boot_model.glb
gltfLoader.load('/models/biker_boot_model.glb', (gltfBiker) => {
  const bikerBoot = gltfBiker.scene.children[0];
  console.log(bikerBoot); // Log the loaded model to inspect its properties

  // adjust position and scale of the biker boot model
  bikerBoot.position.set(0, 0, 0); // Adjust the position as needed
  bikerBoot.scale.set(8, 8, 8);

  bikerBoot.traverse((child) => {
    if (child.isMesh) {
      // Apply a more realistic material with reflections and shadows
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.7,
        roughness: 0.4,
      });
      child.material = material;

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(gltfBiker.scene);
});

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(-550, 60, 600);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
  scene.add(directionalLightHelper);

  // shadows
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 500;


renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.needsUpdate = true;


// make window resize responsive
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);


camera.position.set(0, 15, 30);
// camera.position.z = 80;

function animate() {
  requestAnimationFrame(animate);
  controls.update();


  renderer.render(scene, camera);
}

animate();
