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

// load models/shoe_tekken.glb
gltfLoader.load('/models/white_boot.glb', (gltf) => {
  const shoe = gltf.scene.children[0];
  console.log(shoe); // Log the loaded model to inspect its properties

  // adjust position and scale of the shoe model
  shoe.position.set(0, 0, 0);
  shoe.scale.set(8, 8, 8);

  shoe.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });


  scene.add(gltf.scene);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(12, 8, 10);
  scene.add(directionalLight);

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
  scene.add(directionalLightHelper);
});


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


camera.position.set(12, 8, 10);
// camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  controls.update();


  renderer.render(scene, camera);
}

animate();
