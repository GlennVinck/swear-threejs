import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { model } from "mongoose";
import { Shoe } from "./classes/shoe.js";
import TWEEN from "@tweenjs/tween.js";
import { GUI } from "dat.gui";

//-----------------CREATE SCENE-----------------//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1.6;
camera.position.y = 0.3;

scene.add(camera);

//-----------------DEFINE CONSTANTS-----------------//

// raycaster and mouse for mouse picking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const gui = new GUI();

const componentColorOptions = {
  Red: 0xff0000,
  Green: 0x00ff00,
  Blue: 0x0000ff,
  Yellow: 0xffff00,
  Purple: 0x800080,
  // Add more color options as needed
};

//-----------------LOAD SHOE CLASS-----------------//

const shoe = new Shoe(scene);
console.log(shoe);

//-----------------RENDERER-----------------//

const configurator = document.getElementById("configurator");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(configurator.clientWidth, configurator.clientHeight);
renderer.setClearColor(new THREE.Color(0xffffff));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.needsUpdate = true;
renderer.setPixelRatio(window.devicePixelRatio);
configurator.appendChild(renderer.domElement);

//-----------------GEOMETRIES-----------------//

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  roughness: 1, // adjust as needed
  metalness: 0, // adjust as needed
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -0.2;
ground.receiveShadow = true;
scene.add(ground);

//-----------------CUBEMAP-----------------//

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

//-----------------CONTROLS-----------------//

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1.2;
//controls.maxDistance = 2;
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2 + 0.06;

//-----------------GUI-----------------//

//-----------------LIGHTS-----------------//

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const shadowLight = new THREE.DirectionalLight(0xffffff, 1.75);
shadowLight.position.set(0, 150, 0);
shadowLight.castShadow = true;
scene.add(shadowLight);
shadowLight.shadow.mapSize.width = 2048;
shadowLight.shadow.mapSize.height = 2048;
shadowLight.shadow.camera.near = 0.1;
shadowLight.shadow.camera.far = 1000;

const pointLight1 = new THREE.PointLight(0xffffff, 2);
pointLight1.position.set(1.5, 1, 1.5);
pointLight1.castShadow = false;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 2);
pointLight2.position.set(-1.5, 1, -1.5);
pointLight2.castShadow = false;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 2);
pointLight3.position.set(1.5, 1, -1.5);
pointLight3.castShadow = false;
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xffffff0, 2);
pointLight4.position.set(-1.5, 1, 1.5);
pointLight4.castShadow = false;
scene.add(pointLight4);

//-----------------HELPERS-----------------//

// const shadowLightHelper = new THREE.DirectionalLightHelper(
//   shadowLight,
//   1,
//   0x000000
// );
// scene.add(shadowLightHelper);

// const pointLight1Helper = new THREE.PointLightHelper(
//   pointLight1,
//   0.5,
//   0x000000
// );
// scene.add(pointLight1Helper);

// const pointLight2Helper = new THREE.PointLightHelper(
//   pointLight2,
//   0.5,
//   0x000000
// );
// scene.add(pointLight2Helper);
// const pointLight3Helper = new THREE.PointLightHelper(
//   pointLight3,
//   0.5,
//   0x000000
// );
// scene.add(pointLight3Helper);
// const pointLight4Helper = new THREE.PointLightHelper(
//   pointLight4,
//   0.5,
//   0x000000
// );
// scene.add(pointLight4Helper);

//-----------------RESPONSIVE WINDOW RESIZE-----------------//

onWindowResize();
function onWindowResize() {
  renderer.setSize(configurator.clientWidth, configurator.clientHeight);
  camera.aspect = configurator.clientWidth / configurator.clientHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowResize);
window.addEventListener("click", onMouseClick);

//-----------------RAYCASTER-----------------//

function onMouseClick(event) {
  // calculate normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // check for intersections
  const intersects = raycaster.intersectObjects(shoe.modelParts);

  // process the intersections
  if (intersects.length > 0) {
    const selectedObject = intersects[0].object;

    // Check if the folder already exists and remove it
    if (gui.__folders["Color"]) {
      gui.__folders["Color"].__controllers.forEach((controller) => {
        gui.__folders["Color"].remove(controller);
      });
      gui.__folders["Color"].__ul.remove();
      delete gui.__folders["Color"];
    }

    // Create a new folder for color control
    const colorFolder = gui.addFolder("Color");
    colorFolder.open();

    // Get material color and create a hex representation
    const color = selectedObject.material.color.getHex();

    // Add color control to GUI
    const colorControl = colorFolder
      .addColor({ color: color }, "color")
      .name(selectedObject.name);

    // Handle color change event
    colorControl.onChange(function (selectedColor) {
      // Set the new color to the material
      selectedObject.material.color.set(selectedColor);
    });

    // Focus on the selected object
    focusOnObject(selectedObject);

    console.log(selectedObject.name);
  }
}

function focusOnObject(object) {
  const targetPosition = new THREE.Vector3();
  object.getWorldPosition(targetPosition);

  let offset;

  switch (object.name) {
    case "sole_1":
      offset = new THREE.Vector3(-1, 0, 1);
      break;

    case "sole_2":
      offset = new THREE.Vector3(1, 0, 1);
      break;

    case "outside_2":
      offset = new THREE.Vector3(0.25, 0.25, -0.5);
      break;

    case "outside_1":
      offset = new THREE.Vector3(1, 0.4, 1);
      break;

    case "laces":
      offset = new THREE.Vector3(0, 1, 1);
      break;

    case "inside":
      offset = new THREE.Vector3(1, 1, 1);
      break;

    default:
      offset = new THREE.Vector3(0, 0, 0);
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

//-----------------ANIMATE-----------------//

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
}

animate();
