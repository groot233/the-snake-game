import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css';
import { Vector2, Vector3 } from 'three';
import { PlayGround } from './PlayGround';
import { CameraControls } from './CameraControls';

const velocityScalar = 0.05;

type gameState = 'start' | 'end';

function convertKeyToVector(key: string): Vector3 {
    if (key === "ArrowUp" || key === "w") {
        console.log("ArrowUp");
        return (new Vector3(0, 0, -1 * velocityScalar));
    } else if (key === "ArrowDown" || key === "s") {
        console.log("ArrowDown");
        return (new Vector3(0, 0, 1 * velocityScalar));
    } else if (key === "ArrowLeft" || key === "a") {
        console.log("ArrowLeft");
        return (new Vector3(-1 * velocityScalar, 0, 0));
    } else if (key === "ArrowRight" || key === "d") {
        console.log("ArrowRight");
        return (new Vector3(1 * velocityScalar, 0, 0));
    } else {
        return (new Vector3(0, 0, 0));
    }
}

export function Game() {
    const [body, setBody] = useState([new Vector2(0, 0)]);// storing a list of position vectors
    const [gameState, setGameState] = useState([new Vector2(0, 0)]);
    const direction = useRef(new Vector3(0, 0, 0)); // store direction

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
        let v = convertKeyToVector(key);
        let vCopy = v.clone();
        if (!(vCopy.add(direction.current).equals(new Vector3(0, 0, 0)))) {
            direction.current = v;
            // console.log("set v", v, direction.current);
        } else {
            // console.log("not set v");
        }
    }

    function handleBodyChange(newBody: Vector2[]) {
        setBody([...newBody]);
    }

    function handleGameOver() {
        console.log("game over!");
        direction.current.set(0, 0, 0);
    }

    return (
        <div id="canvasContainer" style={{ width: window.innerWidth, height: window.innerHeight }}>
            <Canvas camera={{ position: [0, 15, 7] }}>
                <CameraControls />
                <ambientLight args={["0x404040", 0.2]} />
                <directionalLight />
                <PlayGround body={body} velocity={direction.current} onBodyChange={handleBodyChange} onGameOver={handleGameOver} />
                <gridHelper args={[17, 17]} position={[0, -0.4, 0]} />
                <axesHelper args={[3]} position={[-15, 0, -15]} />
            </Canvas>
        </div>);
}