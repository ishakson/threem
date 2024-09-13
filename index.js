import * as Three from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new Three.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geometry = new Three.BoxGeometry();
const material = new Three.MeshStandardMaterial({
  color: 0x00ff00,
});
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

const hemLight = new Three.HemisphereLight(0xffffff, 0xffffff, 0.6);
scene.add(hemLight);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);

  controls.update();
}

animate();
