import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

export function Button() {
    // This reference will give us direct access to the mesh
    const mesh = useRef<THREE.Mesh>(null!);
    const font = useLoader(THREE.FontLoader, '../public/helvetiker_bold.typeface.json');
    console.log(font);
    useEffect(() => { mesh.current.rotation.x += 0.5 }, []);
    return (<>
            <mesh position={[0, 5, 2]} ref={mesh}>
                {/* <textGeometry args={["Start Game", {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 1,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                }]} /> */}
                <boxGeometry args={[5, 0.2, 2]} />
                <meshToonMaterial color='white' opacity={0.6}
                    transparent={true} />
            </mesh>
    </>);
}