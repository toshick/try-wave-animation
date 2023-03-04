import * as THREE from 'three';

const waveMod = (() => {
  const api: any = {};
  // Wave grid helper
  const waveGrid = function (opt: any = {}) {
    opt = opt || {};
    opt.width = opt.width || 10;
    opt.depth = opt.depth || 10;
    opt.height = opt.height || 2;
    opt.forPoint = opt.forPoint || function () {};
    opt.context = opt.context || opt;
    opt.xStep = opt.xStep || 0.025;
    opt.yStep = opt.yStep || 0.05;
    opt.zStep = opt.zStep || 0.025;
    opt.waveOffset = opt.waveOffset === undefined ? 0 : opt.waveOffset;
    const points = [];
    let radPer,
      x = 0,
      i = 0,
      y,
      z;
    // points
    while (x < opt.width) {
      z = 0;
      while (z < opt.depth) {
        // radian percent
        radPer = (z / opt.depth + (1 / opt.width) * x + opt.waveOffset) % 1;
        // y value of point
        y = Math.cos(Math.PI * 2 * radPer) * opt.height;
        // call forPoint
        opt.forPoint.call(
          opt.context,
          x * opt.xStep,
          y * opt.yStep,
          z * opt.zStep,
          i
        );
        // step z, and point index
        z += 1;
        i += 3;
      }
      x += 2;
    }
  };
  // make a points mesh
  api.create = function (opt) {
    opt = opt || {};
    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];
    opt.forPoint = function (x, y, z, i) {
      points.push(x, y, z);
    };
    waveGrid(opt);
    const vertices = new Float32Array(points);
    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return new THREE.Points(
      // geometry as first argument
      geometry,
      // then Material
      new THREE.PointsMaterial({
        size: 0.125,
        color: new THREE.Color(1.0, 0.5, 0.5),
      })
    );
  };
  // update points
  api.update = function (points, per, opt) {
    opt = opt || {};
    const position = points.geometry.getAttribute('position');
    opt.waveOffset = per;
    opt.forPoint = function (x, y, z, i) {
      position.array[i] = x - 0;
      position.array[i + 1] = y;
      position.array[i + 2] = z - 0;
    };
    // update points
    waveGrid(opt);
    position.needsUpdate = true;
  };
  return api;
})();

const Wave = (element: HTMLElement) => {
  //-------- ----------
  // SCENE
  //-------- ----------
  const scene = new THREE.Scene();
  // scene.add(new THREE.GridHelper(10, 10));
  const camera = new THREE.PerspectiveCamera(
    10,
    element.clientWidth / element.clientHeight,
    0.001,
    1000
  );
  camera.position.set(10, 2, 0);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGL1Renderer({ alpha: true });
  renderer.setSize(element.clientWidth, element.clientHeight, false);
  element.appendChild(renderer.domElement);
  //-------- ----------
  // POINTS
  //-------- ----------
  const w = 30,
    h = 30;
  const tw = 6,
    th = 3;
  const opt_waves = {
    width: w,
    depth: h,
    xStep: tw / w,
    zStep: th / h,
  };
  const points = waveMod.create(opt_waves);
  points.position.set((tw / 2) * -1, 0, (th / 2) * -1);
  scene.add(points);
  //-------- ----------
  // LOOP
  //-------- ----------
  let frame = 0,
    lt = new Date();
  const maxFrame = 800,
    fps = 30;
  const loop = function () {
    const now = new Date(),
      secs = (now - lt) / 1000,
      per = frame / maxFrame,
      bias = 1 - Math.abs(per - 0.5) / 0.5;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
      // calling update method
      waveMod.update(points, (per * 8) % 1, opt_waves);
      renderer.render(scene, camera);
      frame += fps * secs;
      frame %= maxFrame;
      lt = now;
    }
  };
  loop();
};

export default Wave;
