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
      const shoe = gltfBiker.scene.children[0];
      console.log(shoe); // Log the loaded model to inspect its properties

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

      polyesterDiffuseMap.anisotropy = 16;
      polyesterNormalMap.anisotropy = 16;
      polyesterRoughnessMap.anisotropy = 16;
      polyesterAOMap.anisotropy = 16;
      polyesterDisplacementMap.anisotropy = 16;

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

      const leatherDiffuseMap = new THREE.TextureLoader().load(
        "./textures/leather/Leather_005_basecolor.jpg"
      );
      const leatherNormalMap = new THREE.TextureLoader().load(
        "./textures/leather/Leather_005_normal.jpg"
      );
      const leatherRoughnessMap = new THREE.TextureLoader().load(
        "./textures/leather/Leather_005_roughness.jpg"
      );
      const leatherAOMap = new THREE.TextureLoader().load(
        "./textures/leather/Leather_005_ambientOcclusion.jpg"
      );
      const leatherDisplacementMap = new THREE.TextureLoader().load(
        "./textures/leather/Leather_005_height.png"
      );

      // make textures smaller

      leatherDiffuseMap.repeat.set(14, 14);
      leatherNormalMap.repeat.set(14, 14);
      leatherRoughnessMap.repeat.set(14, 14);
      leatherAOMap.repeat.set(14, 14);
      leatherDisplacementMap.repeat.set(14, 14);

      // make textures sharper

      leatherDiffuseMap.anisotropy = 16;
      leatherNormalMap.anisotropy = 16;
      leatherRoughnessMap.anisotropy = 16;
      leatherAOMap.anisotropy = 16;
      leatherDisplacementMap.anisotropy = 16;

      // make textures seamless

      leatherDiffuseMap.wrapS = THREE.RepeatWrapping;
      leatherDiffuseMap.wrapT = THREE.RepeatWrapping;
      leatherNormalMap.wrapS = THREE.RepeatWrapping;
      leatherNormalMap.wrapT = THREE.RepeatWrapping;
      leatherRoughnessMap.wrapS = THREE.RepeatWrapping;
      leatherRoughnessMap.wrapT = THREE.RepeatWrapping;
      leatherAOMap.wrapS = THREE.RepeatWrapping;
      leatherAOMap.wrapT = THREE.RepeatWrapping;
      leatherDisplacementMap.wrapS = THREE.RepeatWrapping;
      leatherDisplacementMap.wrapT = THREE.RepeatWrapping;

      const plasticDiffuseMap = new THREE.TextureLoader().load(
        "./textures/plastic/Plastic_003_basecolor.jpg"
      );
      const plasticNormalMap = new THREE.TextureLoader().load(
        "./textures/plastic/Plastic_003_normal.jpg"
      );
      const plasticRoughnessMap = new THREE.TextureLoader().load(
        "./textures/plastic/Plastic_003_roughness.jpg"
      );
      const plasticAOMap = new THREE.TextureLoader().load(
        "./textures/plastic/Plastic_003_ambientOcclusion.jpg"
      );
      const plasticDisplacementMap = new THREE.TextureLoader().load(
        "./textures/plastic/Plastic_003_height.png"
      );

      // make textures smaller

      plasticDiffuseMap.repeat.set(2, 2);
      plasticNormalMap.repeat.set(2, 2);
      plasticRoughnessMap.repeat.set(2, 2);
      plasticAOMap.repeat.set(2, 2);
      plasticDisplacementMap.repeat.set(2, 2);

      // make textures sharper

      plasticDiffuseMap.anisotropy = 16;
      plasticNormalMap.anisotropy = 16;
      plasticRoughnessMap.anisotropy = 16;
      plasticAOMap.anisotropy = 16;
      plasticDisplacementMap.anisotropy = 16;

      // make textures seamless

      plasticDiffuseMap.wrapS = THREE.RepeatWrapping;
      plasticDiffuseMap.wrapT = THREE.RepeatWrapping;
      plasticNormalMap.wrapS = THREE.RepeatWrapping;
      plasticNormalMap.wrapT = THREE.RepeatWrapping;
      plasticRoughnessMap.wrapS = THREE.RepeatWrapping;
      plasticRoughnessMap.wrapT = THREE.RepeatWrapping;
      plasticAOMap.wrapS = THREE.RepeatWrapping;
      plasticAOMap.wrapT = THREE.RepeatWrapping;
      plasticDisplacementMap.wrapS = THREE.RepeatWrapping;
      plasticDisplacementMap.wrapT = THREE.RepeatWrapping;

      const nylonDiffuseMap = new THREE.TextureLoader().load(
        "./textures/nylon/Nylon_Ribbon_001_basecolor.jpg"
      );
      const nylonNormalMap = new THREE.TextureLoader().load(
        "./textures/nylon/Nylon_Ribbon_001_normal.jpg"
      );
      const nylonRoughnessMap = new THREE.TextureLoader().load(
        "./textures/nylon/Nylon_Ribbon_001_roughness.jpg"
      );
      const nylonAOMap = new THREE.TextureLoader().load(
        "./textures/nylon/Nylon_Ribbon_001_ambientOcclusion.jpg"
      );
      const nylonDisplacementMap = new THREE.TextureLoader().load(
        "./textures/nylon/Nylon_Ribbon_001_height.png"
      );

      // make textures smaller

      nylonDiffuseMap.repeat.set(2.5, 2.5);
      nylonNormalMap.repeat.set(2.5, 2.5);
      nylonRoughnessMap.repeat.set(2.5, 2.5);
      nylonAOMap.repeat.set(2.5, 2.5);
      nylonDisplacementMap.repeat.set(2.5, 2.5);

      // make textures sharper

      nylonDiffuseMap.anisotropy = 16;
      nylonNormalMap.anisotropy = 16;
      nylonRoughnessMap.anisotropy = 16;
      nylonAOMap.anisotropy = 16;
      nylonDisplacementMap.anisotropy = 16;

      // make textures seamless

      nylonDiffuseMap.wrapS = THREE.RepeatWrapping;
      nylonDiffuseMap.wrapT = THREE.RepeatWrapping;
      nylonNormalMap.wrapS = THREE.RepeatWrapping;
      nylonNormalMap.wrapT = THREE.RepeatWrapping;
      nylonRoughnessMap.wrapS = THREE.RepeatWrapping;
      nylonRoughnessMap.wrapT = THREE.RepeatWrapping;
      nylonAOMap.wrapS = THREE.RepeatWrapping;
      nylonAOMap.wrapT = THREE.RepeatWrapping;
      nylonDisplacementMap.wrapS = THREE.RepeatWrapping;
      nylonDisplacementMap.wrapT = THREE.RepeatWrapping;

      let outsideSole = new THREE.MeshStandardMaterial({
        color: 0x202020,
        metalness: 0,
        roughness: 0.8,
        normalMap: sole1NormalMap,
        aoMap: sole1AOMap,
        displacementMap: sole1DisplacementMap,
        displacementScale: 0,
        roughnessMap: sole1RoughnessMap,
      });

      let insideSole = new THREE.MeshStandardMaterial({
        color: 0x55ebef,
        metalness: 0.2,
        roughness: 0.8,
        normalMap: leatherNormalMap,
        aoMap: leatherAOMap,
        displacementMap: leatherDisplacementMap,
        displacementScale: 0,
        roughnessMap: leatherRoughnessMap,
      });

      let inside = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0,
        roughness: 0.8,
        normalMap: polyesterNormalMap,
        aoMap: polyesterAOMap,
        displacementMap: polyesterDisplacementMap,
        displacementScale: 0,
        roughnessMap: polyesterRoughnessMap,
      });

      let swoosh = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.8,
        normalMap: plasticNormalMap,
        aoMap: plasticAOMap,
        displacementMap: plasticDisplacementMap,
        displacementScale: 0,
        roughnessMap: plasticRoughnessMap,
      });

      let laces = new THREE.MeshStandardMaterial({
        color: 0x202020,
        metalness: 0,
        roughness: 0.8,
        normalMap: nylonNormalMap,
        aoMap: nylonAOMap,
        displacementMap: nylonDisplacementMap,
        displacementScale: 0,
        roughnessMap: nylonRoughnessMap,
      });

      let strap = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.7,
        roughness: 0.4,
      });

      let defaultMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        metalness: 0.7,
        roughness: 0.4,
      });

      shoe.position.set(0, 0.05, -0.1);
      shoe.rotation.y = Math.PI / 2;
      shoe.scale.set(5, 5, 5);

      shoe.traverse((child) => {
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
