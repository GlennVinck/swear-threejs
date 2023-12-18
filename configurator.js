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


//-----------------COLORS-----------------//
const componentColorOptions = [
  "#EEEEEE",
  "#000000",
  "#FAC7B1",
  "#F9B090",
  "#F79970",
  "#F58250",
  "#F36B30",
  "#F15410",
  // Add more color options as needed
];



// render colors in divs in the DOM
const colorPicker = document.getElementById("color-picker");
for (const color of componentColorOptions) {
  const colorDiv = document.createElement("div");
  colorDiv.style.backgroundColor = color;
  colorDiv.style.width = "100%";
  colorDiv.style.height = "auto";
  colorDiv.style.cursor = "pointer";
  colorDiv.style.position = "relative";
  colorDiv.style.zIndex = 1;
  colorDiv.style.transition = "transform 0.2s ease-in-out";
  colorDiv.addEventListener("click", () => {
    console.log(color);
    changeColor(selectedObject, color);
  });
  colorDiv.addEventListener("mouseover", () => {
    colorDiv.style.transform = "translateY(-5px)";
    colorDiv.style.zIndex = 2;
  });
  colorDiv.addEventListener("mouseout", () => {
    colorDiv.style.transform = "translateY(0)";
    colorDiv.style.zIndex = 1;
  });
  colorPicker.appendChild(colorDiv);
}

//-----------------SIZES-----------------//
const sizes = ["35","36","37","38","39" ,"40", "41", "42", "43", "44", "45", "46"];

//-----------------QUANTITY-----------------//
let currentQuantity = 1;
let basePrice = 175;
let priceIncrement = 120;
const maxQuantity = 5;
const quantityDisplay = document.getElementById("quantityDisplay");

//-----------------LOAD SHOE CLASS-----------------//

const shoe = new Shoe(scene);
console.log(shoe);

//-----------------RENDERER-----------------//

const configurator = document.getElementById("configurator");
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
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



function changeColor(selectedObject, newColor) {
  // update the material color of the selected object
  selectedObject.material.color.set(new THREE.Color(newColor));
}




//-----------------RAYCASTER-----------------//

let selectedObject;

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
    selectedObject = intersects[0].object;

    // update the selected part in the HTML
    const selectedPart = document.getElementById("selected-part");
    selectedPart.innerHTML = selectedObject.name;

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
      if (selectedObject && selectedObject.material) {
      // Set the new color to the material
      selectedObject.material.color.set(selectedColor);
      }
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


//-----------------CHOOSE SIZE-----------------//
// add the sizes to the dropdown
const sizeDropdown = document.getElementById("sizeDropdown");
for (const selectedSize of sizes) {
  const option = document.createElement("option");
  option.value = selectedSize;
  option.text = selectedSize;
  sizeDropdown.add(option);
}

// update the existing event listener to set the selected size
sizeDropdown.addEventListener("change", function (event) {
  const selectedSize = event.target.value;
  updateSelectedSize(selectedSize);
});

// add a function to update the selected size in the HTML
function updateSelectedSize(selectedSize) {
  const sizeDisplay = document.getElementById("sizeDisplay");
  sizeDisplay.textContent = selectedSize;
}




//-----------------QUANTITY-----------------//

document.getElementById("incrementBtn").addEventListener("click", incrementQuantity);
document.getElementById("decrementBtn").addEventListener("click", decrementQuantity);

function incrementQuantity() {
  if (currentQuantity < maxQuantity) {
    currentQuantity++;
  updateQuantityDisplay();
  console.log(currentQuantity);
  } else {
    alert("Maximum quantity reached");
}
}

function decrementQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--;
    updateQuantityDisplay();
  }
  console.log(currentQuantity);
}

function updateQuantityDisplay() {
  quantityDisplay.textContent = currentQuantity;
  const totalPrice = document.getElementById("totalPrice");
  const calculatedPrice = basePrice + (currentQuantity - 1) * priceIncrement;
  totalPrice.textContent = `$${calculatedPrice.toFixed(2)}`;
}






// Add this code at the end of configurator.js

document.getElementById("placeOrderBtn").addEventListener("click", function () {
  // Capture a snapshot of the configurator
  html2canvas(document.getElementById("configurator")).then(function (canvas) {
    const snapshotUrl = canvas.toDataURL("image/png");

    // Get other details like quantity, size, and price
    const selectedSize = document.getElementById("sizeDisplay").textContent;
    const selectedQuantity = currentQuantity;
    const selectedPrice = parseFloat(document.getElementById("totalPrice").textContent.replace("$", ""));

    console.log("Colors of selected objects:");
const colorLog = {};
shoe.modelParts.forEach((selectedObject) => {
  const colorHex = selectedObject.material.color.getHexString();
  console.log(`${selectedObject.name}: ${colorHex}`);
  colorLog[selectedObject.name] = colorHex;
});

localStorage.setItem("colorLog", JSON.stringify(colorLog));

    // Prepare the data to send to checkout.html
    const orderData = {
      image: snapshotUrl,
      shoeSize: selectedSize,
      quantity: selectedQuantity,
      price: selectedPrice,
      color: selectedObject.material.color.getHexString(), // Convert THREE.Color to hex string
    };

    // Save the order data to local storage for retrieval in checkout.html
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Redirect to the checkout page
    window.location.href = "./userDetails.html";
  });
});






//-----------------ANIMATE-----------------//

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
}

animate();
