import "./style.css";
import * as THREE from "three";
// import GLTFLoader for loading models
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import dat.gui
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundmaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(groundGeometry, groundmaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -0.5;
plane.receiveShadow = true;
plane.castShadow = true;
scene.add(plane);

// const cubeTextureLoader = new THREE.CubeTextureLoader();zzzz
// const environmentMapTexture = cubeTextureLoader.load([
//   "/cubemap/px.png",
//   "/cubemap/nx.png",
//   "/cubemap/py.png",
//   "/cubemap/ny.png",
//   "/cubemap/pz.png",
//   "/cubemap/nz.png",
// ]);

//scene.background = environmentMapTexture;

// add controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.5;
controls.maxDistance = 1;

const gltfLoader = new GLTFLoader();

let gui;

const componentColorOptions = {
  Red: 0xff0000,
  Green: 0x00ff00,
  Blue: 0x0000ff,
  Yellow: 0xffff00,
  Purple: 0x800080,
  // Add more color options as needed
};

function setupGUI(mesh, material, component) {
  gui = new dat.GUI();
  const folder = gui.addFolder(mesh.name || "Mesh");
  folder.open();
}

// load models/biker_boot_model.glb
gltfLoader.load("/models/shoe-optimized-arne.glb", (gltfBiker) => {
  const bikerBoot = gltfBiker.scene.children[0];
  console.log(bikerBoot); // Log the loaded model to inspect its properties

  let outsideSole = new THREE.MeshStandardMaterial({
    color: 0xffff00, // Red
    metalness: 0.7,
    roughness: 0.4,
  });

  let insideSole = new THREE.MeshStandardMaterial({
    color: 0x0000ff, // Green
    metalness: 0.7,
    roughness: 0.4,
  });

  let inside = new THREE.MeshStandardMaterial({
    color: 0x800080,
    metalness: 0.7,
    roughness: 0.4,
  });

  let swoosh = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Purple (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });

  let laces = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // SaddleBrown (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });

  let strap = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // DarkOrchid (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });

  let defaultMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    metalness: 0.7,
    roughness: 0.4,
  });

  // adjust position and scale of the biker boot model
  bikerBoot.position.set(0, 0, 0); // Adjust the position as needed
  bikerBoot.scale.set(2, 2, 2);

  bikerBoot.traverse((child) => {
    if (child.isMesh) {
      child.material = defaultMaterial;
      child.castShadow = true;
      child.receiveShadow = true;

      switch (child.name) {
        case "sole_1":
          child.material = insideSole;
          break;

        case "sole_2":
          child.material = outsideSole;
          break;

        case "outside_2":
          child.material = strap;
          break;

        case "outside_1":
          child.material = swoosh;
          break;

        case "laces":
          child.material = laces;
          break;

        case "inside":
          child.material = inside;
          break;
      }

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(gltfBiker.scene);
  findObjectsByName(gltfBiker.scene, "");
});

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 2, 2);
directionalLight.castShadow = true;

scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
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

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}

animate();

function findObjectsByName(object, targetName) {
  if (object.name && object.name.includes(targetName)) {
    console.log("Found:", object);
  }

  if (object.children) {
    for (const child of object.children) {
      findObjectsByName(child, targetName);
    }
  }
}
