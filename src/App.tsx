/* eslint-disable */
import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Game } from './Game';

function Lawn(props: JSX.IntrinsicElements['mesh']) {
  return (<>
    <mesh
      {...props}>
      <boxGeometry args={[30, 0.2, 30]} />
      <meshToonMaterial color='#578a34' />
    </mesh>
    <axesHelper args={[100]} />
  </>
  );
}

function Snake(props: JSX.IntrinsicElements['mesh']) {
  return (
    <>
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshToonMaterial color='#5076f9' />
      </mesh>
    </>);
}

export default function App() {
  return (
    <Game>
      <Snake position={[0, 0, 0]} />
      <Lawn position={[0, -0.5, 0]} />
    </Game>
  )
}
