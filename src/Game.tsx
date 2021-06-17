import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber'
import './App.css';
import { SphereGeometry, Vector2, Vector3 } from 'three';
import { PlayGround } from './PlayGround';
import { CameraControls } from './CameraControls';
import { inherits } from 'util';

const velocityScalar = 0.01;

type gameState = 'start' | 'end';

export function Game() {

    const [velocity, setVelocity] = useState(new Vector3(0, 0, 0)); // store direction
    const [body, setBody] = useState([new Vector2(0, 0)]);// storing a list of position vectors
    const [gameState, setGameState] = useState([new Vector2(0, 0)]);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        console.log("set up keydown listener");
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            console.log("remove keydown listener");
        }
    }, [])

    function handleKeyDown(event: KeyboardEvent) {
        let key = event.key;
        if (key === "ArrowUp" || key === "w") {
            console.log("ArrowUp");
            setVelocity(new Vector3(0, 0, -1 * velocityScalar));
        } else if (key === "ArrowDown" || key === "s") {
            console.log("ArrowDown");
            setVelocity(new Vector3(0, 0, 1 * velocityScalar));
        } else if (key === "ArrowLeft" || key === "a") {
            console.log("ArrowLeft");
            setVelocity(new Vector3(-1 * velocityScalar, 0, 0));
        } else if (key === "ArrowRight" || key === "d") {
            console.log("ArrowRight");
            setVelocity(new Vector3(1 * velocityScalar, 0, 0));
        }
    }

    function handleBodyChange(newBody: Vector2[]) {
        setBody([...newBody]);
    }

    function handleGameOver() {
        console.log("game over!");
    }

    return (
        <div id="canvasContainer" style={{ width: window.innerWidth, height: window.innerHeight }}>
            <Canvas camera={{ position: [0, 15, 7] }}>
                <CameraControls />
                <ambientLight args={["0x404040", 0.2]} />
                <directionalLight />
                <PlayGround body={body} velocity={velocity} onBodyChange={handleBodyChange} onGameOver={handleGameOver} />
                <gridHelper args={[17, 17]} position={[0, -0.4, 0]} />
                <axesHelper args={[3]} position={[-15, 0, -15]} />
            </Canvas>
        </div>);
}