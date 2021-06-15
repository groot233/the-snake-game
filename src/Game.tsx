import { useEffect, useRef } from 'react'
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

export function Game(props: any) {
    function handleKeyDown(event: KeyboardEvent) {
        let key = event.key;
        if (key === "ArrowUp" || key === "w") {
            console.log("ArrowUp");
        } else if (key === "ArrowDown" || key === "s") {
            console.log("ArrowDown");
        } else if (key === "ArrowLeft" || key === "a") {
            console.log("ArrowLeft");
        } else if (key === "ArrowRight" || key === "d") {
            console.log("ArrowRight");
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    function CameraControls() {
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

    return (
        <>
            <div id="canvasContainer" style={{ width: window.innerWidth, height: window.innerHeight }}>
                <Canvas camera={{ position: [20, 25, 0] }}>
                    <CameraControls />
                    <ambientLight args={["0x404040", 0.2]} />
                    <directionalLight />
                    {props.children}
                </Canvas>
            </div>
        </>);
}