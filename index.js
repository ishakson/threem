import * as Three from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

import spline from "./spline.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new Three.Scene();
scene.fog = new Three.FogExp2(0x000000, 0.3);
const camera = new Three.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new Three.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const points = spline.getPoints(100);
const geometry = new Three.BufferGeometry().setFromPoints(points);
const material = new Three.LineBasicMaterial({ color: 0xff0000 });
const line = new Three.Line(geometry, material);

const tubeGeometry = new Three.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMaterial = new Three.MeshBasicMaterial({
  color: 0x0000ff,
  // side: Three.DoubleSide,
  wireframe: true,
});
const tube = new Three.Mesh(tubeGeometry, tubeMaterial);
scene.add(line, tube);


function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubeGeometry.parameters.path.getPointAt(p);
  const lookAt = tubeGeometry.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

function animate(t = 0) {
  requestAnimationFrame(animate);

  updateCamera(t);
  renderer.render(scene, camera);

  controls.update();
}

animate(0);
