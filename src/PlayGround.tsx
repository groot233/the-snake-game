import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector2, Vector3 } from "three";
import { Food } from "./Food";
import { Lawn } from "./Lawn";

type handleBodyChange = (body: Vector2[]) => void;
const LawnRange = 17;
const foodRadius = 0.5;

interface Props {
    body: Vector2[];
    velocity: Vector3;
    onBodyChange: handleBodyChange;
}

export function PlayGround(props: Props) {
    const [foodPos, setfoodPos] = useState(generateFoodPos());
    useFrame((state, delta) => {
        let newBody = props.body;
        let head = new Vector2(0, 0);
        head.copy(props.body[0]);
        let velocity = new Vector2(props.velocity.x, props.velocity.z);
        let newHead = head.addScaledVector(velocity, delta);
        // console.log(newHead);
        // newHead.set(Math.floor(newHead.x), Math.floor(newHead.x));
        newBody.unshift(newHead);
        // if the snake eats food, no need to pops
        if (newHead.distanceTo(foodPos) < 1) { // eats food
            setfoodPos(generateFoodPos());
            console.log("eats it!", newBody);
        } else {
            newBody.pop();
        }
        // console.log(newHead);
        props.onBodyChange(newBody);
    });

    function generateFoodPos() {
        let row, col;
        do { // cannot have pos (0,0)
            row = randomInt(-LawnRange / 2 + foodRadius, LawnRange / 2 - foodRadius);
            col = randomInt(-LawnRange / 2 + foodRadius, LawnRange / 2 - foodRadius);
        } while (row === 0 && col === 0);
        return new Vector2(row, col);
    }

    function renderPiece(pos: Vector2, index: number) {
        return (
            <>
                <mesh key={index} position={[pos.x, 0, pos.y]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshToonMaterial color={index === 0 ? 'hotpink' : '#5076f9'} />
                </mesh>
            </>);
    }

    return (
        <>
            <Lawn position={[0, -0.5, 0]} LawnRange={LawnRange} />
            <Food foodPos={foodPos} />
            {props.body.map((pos, index) => renderPiece(pos, index))}
        </>);
}

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}