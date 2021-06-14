/* eslint-disable */
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';

function Lawn(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!)
  return (<>
    <mesh
      {...props}
      ref={mesh}>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color='rgb(0,100,0)'/>
    </mesh>
    <axesHelper args={[100]} />
  </>
  )
}

export default function App() {
  console.log(window.innerHeight);
  return (
    <div id="canvasContainer" style={{ width: window.innerWidth, height: window.innerHeight }}>
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5}/>
        <pointLight position={[5, 5, 5]} />
        <Lawn position={[0, -1, 0]} />
      </Canvas>
    </div>
  )
}
