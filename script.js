// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const cWidth = canvas.width;
// const cHeight = canvas.height;

// const width = 20;
// const height = 200;
// let angle = 0;

// draw();

// function draw() {
//   ctx.clearRect(0,0, cWidth, cHeight);
//   update();
//   window.requestAnimationFrame(draw);
// }

// function update() {
//   angle += 0.1;
//   let offset = 0;  
//   for(let x = 0; x < cWidth; x+= width) {
//     const h = Math.sin(angle+offset)*height/2 + height/2;
//     ctx.fillRect(x, cHeight/2-h/2, width-2, h);
//     offset += 0.1;
//   }
// }
const width = window.innerWidth;
const height = window.innerHeight;
let camera, scene, renderer;
let geometry, material, mesh;
let group = new THREE.Group();

let angle = 0;
const count = 30;
const gap = 0.11;
let m;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
	var controls = new THREE.OrbitControls( camera );
	camera.position.z = 1;
	controls.update();
	scene = new THREE.Scene();
	
	geometry = new THREE.BoxGeometry( 0.1, 0.5, 0.1 );
	material = new THREE.MeshNormalMaterial();
	
	for (let z = 0; z < count; z++) {
		for (let x = 0; x < count; x++) {
			let mesh = new THREE.Mesh( geometry, material );
			mesh.position.z = z * gap;
			mesh.position.x = x * gap;
			group.add(mesh);
		}
	}

	group.rotation.x = 0.5;

	scene.add( group );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( width, height );
	document.body.appendChild( renderer.domElement );

	m = group.children.reduce((result, item) => {
		let index = result.length ? result.length-1 : 0;

		if (result[index] && result[index].length >= count) {
			index++;
		}

		if (!result[index]) {
			result[index] = [];
		}

		result[index].push(item);
		return result;
	}, []);
}



function animate() {
	requestAnimationFrame( animate );
	let offset = 0;
	angle += 0.02;

	for(let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			const h = Math.sin(angle + offset);
			
			m[i][j].scale.y = h;
		}
		offset += 0.1;
	}

	renderer.render( scene, camera );

}