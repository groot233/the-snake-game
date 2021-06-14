/* eslint-disable */
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';

function Lawn(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);
  return (<>
    <mesh
      {...props}
      ref={mesh}>
      <boxGeometry args={[10, 3, 10]} />
      <meshToonMaterial color='#578a34' />
    </mesh>
    <axesHelper args={[100]} />
  </>
  );
}

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
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight args={["0x404040", 0.2]} />
        <pointLight position={[3, 3, 0]} />
        <Snake position={[0, 0 , 0]}/>
        <Lawn position={[0, -2, 0]} />
      </Canvas>
    </div>
  )
}
