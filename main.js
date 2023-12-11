import "./style.css";
import * as THREE from "three";
// import GLTFLoader for loading models
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import dat.gui
import * as dat from "dat.gui";
import { model } from "mongoose";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

// raycaster and mouse for mouse picking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const modelParts = [];

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  roughness: 1, // adjust as needed
  metalness: 0, // adjust as needed
});
const plane = new THREE.Mesh(groundGeometry, groundMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -0.2;
plane.receiveShadow = true;
scene.add(plane);

// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const environmentMapTexture = cubeTextureLoader.load([
//   "/cubemap/px.png",
//   "/cubemap/nx.png",
//   "/cubemap/py.png",
//   "/cubemap/ny.png",
//   "/cubemap/pz.png",
//   "/cubemap/nz.png",
// ]);

// scene.background = environmentMapTexture;

// add controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.5;
controls.maxDistance = 1;
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

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

      modelParts.push(child);

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
directionalLight.position.set(0, 1, 1);
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
window.addEventListener("click", onMouseClick);


function onMouseClick(event) {
  // calculate normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // check for intersections
  const intersects = raycaster.intersectObjects(modelParts);

  // process the intersections
  if (intersects.length > 0) {
    const selectedObject = intersects[0].object;
    console.log("Selected Object:", selectedObject.name); // log the selected object name (ex. outside_2, sole_1, etc.)

    focusOnObject(selectedObject);
  }
}

function focusOnObject(object) {
  const targetPosition = new THREE.Vector3();
  object.getWorldPosition(targetPosition);


  let offset;

  switch (object.name) {
    case "sole_1":
      offset = new THREE.Vector3(-5, 0, 5);
      break;

    case "sole_2":
      offset = new THREE.Vector3(5, 0, 5);
      break;

    case "outside_2":
      offset = new THREE.Vector3(0.25, 0.25, -0.5);
      break;

    case "outside_1":
      offset = new THREE.Vector3(20, 2, 5);
      break;

    case "laces":
      offset = new THREE.Vector3(0, 5, 5);
      break;

    case "inside":
      offset = new THREE.Vector3(-20, 5, 0);
      break;

    default:
      offset = new THREE.Vector3(25, 25, 0);
      break;
  }

  targetPosition.add(offset);

  new TWEEN.Tween(camera.position)
    .to(targetPosition, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start()
    .onComplete(() => {
      camera.lookAt(targetPosition);
      camera.up.set(0, 1, 0);
    });
}











function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
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
