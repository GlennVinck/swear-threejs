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




  let outSole = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Red
    metalness: 0.7,
    roughness: 0.4,
  });

  let tip = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Green
    metalness: 0.7,
    roughness: 0.4,
  });


  let heelAndToeBox = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Blue
    metalness: 0.7,
    roughness: 0.4,
  });

  let pullTabAndSwoosh = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Purple (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });

  let insideCollar = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Orange (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let eyeStay = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Maroon (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let tongue = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Olive (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let eyeLets = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Navy (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let laces = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // SaddleBrown (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let laceHooks = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Brown (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let strap = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // DarkOrchid (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });
  
  let strapClip = new THREE.MeshStandardMaterial({
    color: 0x00ff00, // Green (you can change the color as needed)
    metalness: 0.7,
    roughness: 0.4,
  });


let defaultMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.7,
  roughness: 0.4,
});

let newComponentMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000, // Red
  metalness: 0.7,
  roughness: 0.4,
});
  

  // adjust position and scale of the biker boot model
  bikerBoot.position.set(0, 0, 0); // Adjust the position as needed
  bikerBoot.scale.set(8, 8, 8);

  bikerBoot.traverse((child) => {
    if (child.isMesh) {
      child.material = defaultMaterial;
    child.castShadow = true;
    child.receiveShadow = true;

    
      switch (child.name) {
        case "pd_1_plastic_0":
          child.material = outSole; 
          break;

        case "pd_2_1_plastic_0":
          child.material = tip; 
          break;

        case "pd_3_plastic_0":
          child.material = heelAndToeBox;
          break;

        case "pd_4_1_Rezin_0":
          child.material = pullTabAndSwoosh;
          break;

        case "pd_5_Rezin_0":
          child.material = insideCollar; 
          break;

        case "pd_3_1_plastic_0":
          child.material = eyeStay; 
          break;

        case "st_1_Rezin_0":
          child.material = tongue;
          break;

        case "met_1_Metal_0":
          child.material = eyeLets; 
          break;

        case "sh_1_plastic_0":
          child.material = laces;
          break;


        case "kl_1_Metal_0":
          child.material = laceHooks; 
          break;

        case "rem_1_plastic_0":
          child.material = strap; 
          break;

        case "zak_1_Metal_0":
          child.material = strapClip; // Green material for zak_1_Metal_0
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
