import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Shoe {
  constructor(scene) {
    this.scene = scene;
    this.modelParts = [];
    this.loadShoe(this.modelParts);
    this.findObjectsByName(this.modelParts, "");
  }

  loadShoe(modelParts) {
    // load models/biker_boot_model.glb
    const gltfLoader = new GLTFLoader();

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
        color: 0xffffff,
        metalness: 0.7,
        roughness: 0.4,
      });

      let swoosh = new THREE.MeshStandardMaterial({
        color: 0x00ff00, // Purple (you can change the color as needed)
        metalness: 0.7,
        roughness: 0.4,
      });

      let laces = new THREE.MeshStandardMaterial({
        color: 0x00ffff, // SaddleBrown (you can change the color as needed)
        metalness: 0.7,
        roughness: 0.4,
      });

      let strap = new THREE.MeshStandardMaterial({
        color: 0x000000, // DarkOrchid (you can change the color as needed)
        metalness: 0.7,
        roughness: 0.4,
      });

      let defaultMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        metalness: 0.7,
        roughness: 0.4,
      });

      // adjust position and scale of the biker boot model
      bikerBoot.position.set(0, 0.3, 0);
      bikerBoot.scale.set(5, 5, 5);

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

      this.scene.add(gltfBiker.scene);
      this.findObjectsByName(gltfBiker.scene, "");
    });
  }
  findObjectsByName(object, targetName) {
    if (object.name && object.name.includes(targetName)) {
      console.log("Found:", object);
    }

    if (object.children) {
      for (const child of object.children) {
        this.findObjectsByName(child, targetName);
      }
    }
  }
}
