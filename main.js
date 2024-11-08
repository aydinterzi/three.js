import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Sahne, Kamera ve Renderer Oluşturma
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Kontrolleri Oluşturma
const controls = new OrbitControls(camera, renderer.domElement);

// TextureLoader ve Doku Yükleme
// const textureLoader = new THREE.TextureLoader();
// const woodTexture = textureLoader.load("textures/wood.jpg");

// Geometri ve Dokulu Malzeme Oluşturma
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x0077ff,
  roughness: 0.5,
  metalness: 0.5,
});
const box = new THREE.Mesh(boxGeometry, material);
scene.add(box);

// Işıklandırma
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Raycaster ve Mouse Tanımlama
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);

  // Nesneleri Döndürme
  box.rotation.y += 0.01;

  // Raycaster'ı Güncelleme
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // Kesişen Nesnelerin Rengini Değiştirme
  box.material.color.set(0xffffff); // Varsayılan renk
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000); // Kırmızı renk
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
