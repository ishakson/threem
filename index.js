import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.25;

const loader = new THREE.TextureLoader();

const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  map: loader.load("./earthmap1k.jpg"),
});

const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

const hemLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemLight);
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.x += 0.001;
  earthMesh.rotation.y += 0.001;
  renderer.render(scene, camera);
  controls.update();
}
animate();
