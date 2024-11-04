import { createRef, LegacyRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Knife3D() {
  const model3DContainerRef: LegacyRef<HTMLDivElement> = createRef<HTMLDivElement>();

  useEffect(() => {
    console.log('📦 Loading barbers scissors\' model...');
    if (window.render3dModelLoaded) {
      return;
    }

    window.render3dModelLoaded = true;

    let mixer: THREE.AnimationMixer | null = null;
    let model: THREE.Group | null = null;

    const clock = new THREE.Clock();

    const m3DCWidth = (model3DContainerRef.current?.clientWidth ?? 1);
    const m3DCHeight = (model3DContainerRef.current?.clientHeight ?? 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(m3DCWidth, m3DCHeight);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    model3DContainerRef.current?.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.01
    ).texture;
    
    const camera = new THREE.PerspectiveCamera(100, m3DCWidth / m3DCHeight, 1000, 0);
    camera.position.set(5, 2, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(2, 0.5, 0);
    controls.update();
    // controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.maxDistance = 15;
    controls.minDistance = 1;

    const loader = new GLTFLoader();
    loader.load('toy_knife.glb', (gltf) => {
      model = gltf.scene;

      scene.add(model);

      model.scale.set(0.02, 0.02, 0.02);
      model.position.set(0, 0, 0);
      model.rotateX(-Math.PI / 2);

      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();

      animate();
    }, (xhr) => {
      console.log('[📦] %s / %s (%s%) barbers scissors\' model downloaded', xhr.loaded, xhr.total, xhr.loaded / xhr.total * 100)
    }, console.error);

    window.onresize = () => {
      const newM3DCWidth = (model3DContainerRef.current?.clientWidth ?? 1);
      const newM3DCHeight = (model3DContainerRef.current?.clientHeight ?? 1);

      camera.aspect = newM3DCWidth / newM3DCHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newM3DCWidth, newM3DCHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer?.update(delta);
      controls.update();

      if (model) {
        model.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }

    return () => {
      window.onresize = null;
      model3DContainerRef.current?.removeChild(renderer.domElement);

      if (model) {
        scene.remove(model);
      }

      if (mixer) {
        mixer.stopAllAction();
      }

      renderer.dispose();
      pmremGenerator.dispose();

      window.render3dModelLoaded = false;
    }
  }, []);

  return (
    <div className="modelContainer" ref={model3DContainerRef} />
  )
}