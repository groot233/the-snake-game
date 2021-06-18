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
    onGameOver: () => void;
}

export function PlayGround(props: Props) {
    const [foodPos, setfoodPos] = useState(generateFoodPos());
    const [curHead, setCurHead] = useState(new Vector2(0, 0));
    useFrame((state, delta) => {
        let newBody = [...props.body];
        let velocity = new Vector2(props.velocity.x, props.velocity.z);
        setCurHead(curHead.add(velocity));
        let newHead = getHeadInRange(curHead, props.body);
        if ((!newBody.find(i => i.equals(newHead)))) {
            newBody.unshift(newHead);
            // if the snake eats food, no need to pops
            if (curHead.distanceTo(foodPos) < 1) { // eats food
                setfoodPos(generateFoodPos());
                // console.log("eats it!", newBody);
            }
            else {
                newBody.pop();
            }
        }
        props.onBodyChange(newBody);
    });

    function gameOver() {
        props.onGameOver();
    }

    // restrict head position to integer values and within range
    function getHeadInRange(head: Vector2, body: Vector2[]): Vector2 {
        let newHead = new Vector2(Math.floor(head.x), Math.floor(head.y));
        // console.log(newHead);
        if (!(newHead.x >= -LawnRange / 2 + 0.5 && newHead.x <= LawnRange / 2 - 0.5
            && newHead.y >= -LawnRange / 2 + 0.5 && newHead.y <= LawnRange / 2 - 0.5)) {
            // hit the edge, game over
            gameOver();
        } else if (body.length > 1 && body.slice(1, body.length - 1).find(piece => piece.equals(newHead))) {
            // hit the body, game over
            gameOver();
        };
        return newHead;
    }

    function generateFoodPos() {
        let row: number, col: number, pos: Vector2;
        do { // cannot hit snake body
            row = randomInt(-LawnRange / 2 + foodRadius, LawnRange / 2 - foodRadius);
            col = randomInt(-LawnRange / 2 + foodRadius, LawnRange / 2 - foodRadius);
            pos = new Vector2(row, col);
        } while (props.body.find(i => i.equals(pos)));
        return pos;
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