import './style.css'
import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { FontLoader } from 'https://unpkg.com/three@0.139.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://unpkg.com/three@0.139.2/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#bg'),
});
var lasttext = document.getElementById("texxt").textContent;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);
const geometry = new THREE.TorusGeometry(10,2,16,100);
const material = new THREE.MeshStandardMaterial({color: 0x3c3b3b, wireframe: false});
const textmaterial = new THREE.MeshStandardMaterial({color: 0xf7d2ee, wireframe: false});
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(-10,20,20);
scene.add(pointLight);
var loader = new FontLoader();
var text = "test";

scene.background = new THREE.Color(0x1f1f1f);
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-10,2,0);
scene.add(torus);
const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  requestAnimationFrame(animate);
  if(document.getElementById("texxt").textContent != lasttext) {
    lasttext = document.getElementById("texxt").textContent;
    loader.load( './helvetiker_regular.typeface.json', function ( font ) {

      var textGeometry = new TextGeometry( lasttext, {
    
        font: font,
    
        size: 5,
        height: 0.1,
        curveSegments: 12,
    
        bevelThickness: 1,
        bevelSize: 1,
        bevelEnabled: true
    
      });
    
    
      var mesh = new THREE.Mesh( textGeometry, textmaterial );
      mesh.position.set(-10,0,0);
       scene.remove(scene.getObjectByName('last'));
      mesh.name = 'last';
      scene.add( mesh );
     
    }); 
  }
  renderer.render(scene,camera);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.01

controls.update();

}
animate();
