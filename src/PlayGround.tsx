import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { BoxGeometry, Vector2, Vector3 } from "three";

type handleBodyChange = (body: Vector2[]) => void;

interface Props {
    body: Vector2[];
    velocity: Vector3;
    onBodyChange: handleBodyChange;
}

export function PlayGround(props: Props) {
    useFrame((state, delta) => {
        let newBody = props.body;
        let head = props.body[0];
        let velocity = new Vector2(props.velocity.x, props.velocity.z)
        let newHead = head.addScaledVector(velocity, delta);
        newBody.unshift(newHead);
        newBody.pop();
        // console.log(newHead);
        props.onBodyChange(newBody);
    });

    const [foodPos, setfoodPos]=useState(generateFoodPos());
    function generateFoodPos() {
        return new Vector2(randomInt(-15, 15), randomInt(-15, 15));
    }

    function Food() {
        return (
            <mesh position={[foodPos.x, 0, foodPos.y]}>
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshToonMaterial color='#e7471d' />
            </mesh>);
    }

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

    function renderPiece(pos: Vector2, index: number) {

        return (
            <>
                <mesh key={index} position={[pos.x + 0.5, 0, pos.y + 0.5]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshToonMaterial color={index === 0 ? 'hotpink' : '#5076f9'} />
                </mesh>
            </>);
    }

    return (
        <>
            <Lawn position={[0, -0.5, 0]} />
            <Food />
            {props.body.map((pos, index) => renderPiece(pos, index))}
        </>);
}

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}