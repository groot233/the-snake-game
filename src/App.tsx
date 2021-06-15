/* eslint-disable */
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './App.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

function Lawn(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);
  return (<>
    <mesh
      {...props}
      ref={mesh}>
      <boxGeometry args={[10, 1, 10]} />
      <meshToonMaterial color='#578a34' />
    </mesh>
    <axesHelper args={[100]} />
  </>
  );
}

const CameraControls = () => {
  const { camera, gl: { domElement }} = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef(new OrbitControls(camera, domElement));
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      maxPolarAngle={Math.PI/2}
      minPolarAngle={0}
    />
  );
};


function Snake(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!);
  return (
    <>
      <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshToonMaterial color='#5076f9'/>
      </mesh>
    </>);
}

export default function App() {
  return (
    <div id="canvasContainer" style={{ width: window.innerWidth, height: window.innerHeight }}>
      <Canvas camera={{ position: [8, 5, 8] }}>
      <CameraControls />
        <ambientLight args={["0x404040", 0.2]} />
        <pointLight position={[3, 3, 0]}/>
        <Snake position={[0, 0 , 0]}/>
        <Lawn position={[0, -1, 0]} />
      </Canvas>
    </div>
  )
}
