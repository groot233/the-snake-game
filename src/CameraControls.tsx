import { useRef } from 'react'
import { useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber'
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

export function CameraControls() {
    const { camera, gl: { domElement } } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef(new OrbitControls(camera, domElement));
    useFrame(state => controls.current.update());
    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
        />
    );
};