import "./style.css";
import * as THREE from "three";
// import GLTFLoader for loading models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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

const gltfLoader = new GLTFLoader();

// load models/shoe_tekken.glb
gltfLoader.load('/models/white_boot.glb', (gltf) => {
  const shoe = gltf.scene.children[0];
  console.log(shoe); // Log the loaded model to inspect its properties

  // Adjust position and scale of the shoe model
  shoe.position.set(0, 0, 0); // Set the position as needed
  shoe.scale.set(1, 1, 1);    // Set the scale as needed

  scene.add(gltf.scene);
});

// make window resize responsive
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);


camera.position.set(0, 0, 15);
camera.lookAt(new THREE.Vector3(0, 0, 16)); 
// camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
