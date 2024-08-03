/*

// General

import * as THREE from "../assets/three/src/Three.js";
import { OrbitControls } from "../assets/three/examples/jsm/controls/OrbitControls.js";
import { FlakesTexture } from "../assets/three/examples/jsm/textures/FlakesTexture.js";
import { GLTFLoader} from "../assets/three/examples/jsm/loaders/GLTFLoader.js";

let section1 = document.querySelector("#section1");

let iw = window.innerWidth;
let ih = section1.offsetHeight;
if (iw >= 1025) {

    // Models

    let heartURL = new URL("../assets/crystal_heart.glb", import.meta.url);

    let scene, camera, renderer, controls, pointLight;

    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setSize(iw, ih);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    section1.appendChild(renderer.domElement);

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = String(section1.getBoundingClientRect().top - 100) + "px";
    renderer.domElement.style.zIndex = 0;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
    50,
    iw/ih,
    0.01,
    1000
    );
    camera.position.set(0, 0, 500);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.enableZoom = false;

    pointLight = new THREE.PointLight(0xFFFFFF, 100000);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    // Heart

    let firstTime = 1;
    let startAnim = 0;

    let hoverHeart = false;
    let clickHeart = 0;

    let initialScale = {x:0,y:0,z:0};

    let assetLoader = new GLTFLoader();

    assetLoader.load(heartURL.href, function(gltf) {

        let texture = new THREE.CanvasTexture(new FlakesTexture());
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 10;
        texture.repeat.y = 6;


        let model = gltf.scene;
        model.scale.set(100, 100, 100);
        model.children[0].geometry
        let object = model.children[0].children[0].children[0].children[0].children[0].children[0];
        object.material.clearcoat = 1.0;
        object.material.clearcoatRoughness = 0.1;
        object.material.roughness = 0.5;
        object.material.normalMap = texture;
        // object.material.normalScale = new THREE.Vector2(0.15, 0.15);

        object.scale.set(2,2,2);


        scene.add(model);

    }, undefined, function(error) {
        console.log(error);
    });

    // Raycaster

    const rayCaster = new THREE.Raycaster();
    const mousePosition = new THREE.Vector2();

    renderer.domElement.addEventListener("mousemove", (e) => {

    let pos = renderer.domElement.getBoundingClientRect();
    mousePosition.x = (e.clientX / renderer.domElement.offsetWidth) * 2 - 1;
    mousePosition.y = -(((e.clientY - pos.top) / renderer.domElement.offsetHeight) * 2 - 1);
    // console.log(mousePosition.x, mousePosition.y);
});

    // DOM Elements

    let domElements = document.querySelectorAll(".heartEffect");

    // Loop

    function animate() {
    controls.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    // Gestion du système de clic

    if (hoverHeart) {
        hoverHeart = false;
        section1.style.cursor = "auto";
    }

    if (firstTime) {
    setTimeout(() => {
        firstTime = 0;
    }, 2000);
    } else {
        let heart = scene.children[1].children[0].children[0].children[0].children[0].children[0].children[0];
        for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id == heart.id) {
            hoverHeart = true;
            section1.style.cursor = "pointer";
        }
        }

        // We actualize the scale of our heart
        if (clickHeart == 1) {
        clickHeart = 2;
        initialScale.x = heart.scale.x;
        initialScale.y = heart.scale.y;
        initialScale.z = heart.scale.z;
        }
        if (clickHeart) {
        
        heart.scale.x = Math.abs(Math.sin(30*startAnim)/2 + initialScale.x);
        heart.scale.y = Math.abs(Math.sin(30*startAnim)/2 + initialScale.y);
        heart.scale.z = Math.abs(Math.sin(30*startAnim)/2 + initialScale.z);
        startAnim += 0.001;
        if (Math.round(startAnim * 1000) / 1000 == 0.105) { // 0.262 is the period of the function
            clickHeart = 0;
            startAnim = 0;

            domElements.forEach(domElement => {
                domElement.classList.remove("heartbganim");
            });
            
        }
        }

    }

    renderer.render(scene, camera);

    }

    renderer.setAnimationLoop(animate);

    window.addEventListener("resize", () => {
        renderer.domElement.remove();
    });

    // Click sur le Coeur

    document.querySelector("#section1").addEventListener("click", () => {
    if (hoverHeart) {

        if (!clickHeart) {
        clickHeart = 1;
        domElements.forEach(domElement => {
            domElement.classList.add("heartbganim");
        });
        }
    }
    });
}

*/