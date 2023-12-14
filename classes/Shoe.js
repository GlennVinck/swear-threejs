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

      const sole1DiffuseMap = new THREE.TextureLoader().load(
        "./textures/sole-rubber/Rubber_Sole_002_basecolor.jpg"
      );
      const sole1NormalMap = new THREE.TextureLoader().load(
        "./textures/sole-rubber/Rubber_Sole_002_normal.jpg"
      );
      const sole1RoughnessMap = new THREE.TextureLoader().load(
        "./textures/sole-rubber/Rubber_Sole_002_roughness.jpg"
      );
      const sole1AOMap = new THREE.TextureLoader().load(
        "./textures/sole-rubber/Rubber_Sole_002_ambientOcclusion.jpg"
      );
      const sole1DisplacementMap = new THREE.TextureLoader().load(
        "./textures/sole-rubber/Rubber_Sole_002_height.png"
      );

      // make textures smaller

      sole1DiffuseMap.repeat.set(10, 10);
      sole1NormalMap.repeat.set(10, 10);
      sole1RoughnessMap.repeat.set(10, 10);
      sole1AOMap.repeat.set(10, 10);
      sole1DisplacementMap.repeat.set(10, 10);

      // make textures sharper

      sole1DiffuseMap.anisotropy = 16;
      sole1NormalMap.anisotropy = 16;
      sole1RoughnessMap.anisotropy = 16;
      sole1AOMap.anisotropy = 16;
      sole1DisplacementMap.anisotropy = 16;

      // make textures seamless

      sole1DiffuseMap.wrapS = THREE.RepeatWrapping;
      sole1DiffuseMap.wrapT = THREE.RepeatWrapping;
      sole1NormalMap.wrapS = THREE.RepeatWrapping;
      sole1NormalMap.wrapT = THREE.RepeatWrapping;
      sole1RoughnessMap.wrapS = THREE.RepeatWrapping;
      sole1RoughnessMap.wrapT = THREE.RepeatWrapping;
      sole1AOMap.wrapS = THREE.RepeatWrapping;
      sole1AOMap.wrapT = THREE.RepeatWrapping;
      sole1DisplacementMap.wrapS = THREE.RepeatWrapping;
      sole1DisplacementMap.wrapT = THREE.RepeatWrapping;

      const polyesterDiffuseMap = new THREE.TextureLoader().load(
        "./textures/polyester/Fabric_polyester_001_basecolor.jpg"
      );
      const polyesterNormalMap = new THREE.TextureLoader().load(
        "./textures/polyester/Fabric_polyester_001_normal.jpg"
      );
      const polyesterRoughnessMap = new THREE.TextureLoader().load(
        "./textures/polyester/Fabric_polyester_001_roughness.jpg"
      );
      const polyesterAOMap = new THREE.TextureLoader().load(
        "./textures/polyester/Fabric_polyester_001_ambientOcclusion.jpg"
      );
      const polyesterDisplacementMap = new THREE.TextureLoader().load(
        "./textures/polyester/Fabric_polyester_001_height.png"
      );

      // make textures smaller

      polyesterDiffuseMap.repeat.set(2, 2);
      polyesterNormalMap.repeat.set(2, 2);
      polyesterRoughnessMap.repeat.set(2, 2);
      polyesterAOMap.repeat.set(2, 2);
      polyesterDisplacementMap.repeat.set(2, 2);

      // make textures sharper

      // make textures seamless

      polyesterDiffuseMap.wrapS = THREE.RepeatWrapping;
      polyesterDiffuseMap.wrapT = THREE.RepeatWrapping;
      polyesterNormalMap.wrapS = THREE.RepeatWrapping;
      polyesterNormalMap.wrapT = THREE.RepeatWrapping;
      polyesterRoughnessMap.wrapS = THREE.RepeatWrapping;
      polyesterRoughnessMap.wrapT = THREE.RepeatWrapping;
      polyesterAOMap.wrapS = THREE.RepeatWrapping;
      polyesterAOMap.wrapT = THREE.RepeatWrapping;
      polyesterDisplacementMap.wrapS = THREE.RepeatWrapping;
      polyesterDisplacementMap.wrapT = THREE.RepeatWrapping;

      let outsideSole = new THREE.MeshStandardMaterial({
        color: 0x303030, // Red
        metalness: 0,
        roughness: 0.6,
        normalMap: sole1NormalMap,
        aoMap: sole1AOMap,
        displacementMap: sole1DisplacementMap,
        displacementScale: 0.01,
        roughnessMap: sole1RoughnessMap,
      });

      let insideSole = new THREE.MeshStandardMaterial({
        color: 0x0000ff, // Green
        metalness: 0.7,
        roughness: 0.4,
      });

      let inside = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.8,
        normalMap: polyesterNormalMap,
        aoMap: polyesterAOMap,
        displacementMap: polyesterDisplacementMap,
        displacementScale: 0.01,
        roughnessMap: polyesterRoughnessMap,
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
