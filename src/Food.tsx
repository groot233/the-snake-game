import { Vector2 } from "three";

interface FoodProps {
    foodPos: Vector2;
}

export function Food(props: FoodProps) {
    let foodPos = props.foodPos;
    return (
        <mesh position={[foodPos.x, 0, foodPos.y]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshToonMaterial color='#e7471d' />
        </mesh>);
}