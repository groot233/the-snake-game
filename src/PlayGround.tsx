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
        let velocity= new Vector2(props.velocity.x, props.velocity.z)
        let newHead = head.addScaledVector(velocity, delta);
        newBody.unshift(newHead);
        newBody.pop();
        props.onBodyChange(newBody);
    });

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
            {props.body.map((pos, index) => renderPiece(pos, index))}
        </>);
}