(function () {
    'use strict'

    $(".tabs__link").click(function () {
        $(".tabs__link").removeClass("active").eq($(this).index()).addClass("active");
        $(".tab__item").hide().eq($(this).index()).fadeIn(500)
    }).eq(0).addClass("active");

})()

let toggler = document.getElementById('toggler')
let close = document.getElementById('close')
let links = document.querySelectorAll('.tabs__link')

toggler.addEventListener('click', (e) => {
    e.preventDefault();
    toggler.classList.add('opened')
    toggler.style.display = 'none'
})

close.addEventListener('click', (e) => {
    toggler.classList.remove('opened')
    toggler.style.display = 'block'
})


links.forEach((link) => {
    link.addEventListener('click', (e) => {
        if (document.documentElement.clientWidth <= 992) {
            toggler.classList.remove('opened')
            toggler.style.display = 'block'
        }
    })
})

let w = null;
window.addEventListener('resize', () => {
    w = document.documentElement.clientWidth
    if (w > 992) {
        toggler.style.display = 'none'
    } else if (w <= 992 && !toggler.classList.contains('opened')) { toggler.style.display = 'block' }
})


window.addEventListener('scroll', () => {
    w = document.documentElement.clientWidth

    toggler.classList.remove('opened')
    if (w <= 992) {
        toggler.style.display = 'flex'
    }
})
import { OrbitControls } from '../js/OrbitControls.min.js';

let camera, scene, renderer, controls;
let cube;

init();
animate();

function init() {

    let skills = document.getElementById('skills')
    let elem = getComputedStyle(skills)
    let width = elem.width.slice(0, -2)
    let height = elem.height.slice(0, -2)

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 450;

    scene = new THREE.Scene();

    let loader = new THREE.TextureLoader();

    // controls

    controls = new OrbitControls(camera, skills);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 340;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    let materials = [];
    for (let i = 1; i < 7; i++) {
        materials.push(new THREE.MeshBasicMaterial({ map: loader.load('img/cube/' + i + '.jpg') }));
    }

    let geometry = new THREE.BoxBufferGeometry(200, 200, 200);

    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    skills.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    let skills = document.getElementById('skills')
    let elem = getComputedStyle(skills)
    let width = elem.width.slice(0, -2)
    let height = elem.height.slice(0, -2)

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);

}