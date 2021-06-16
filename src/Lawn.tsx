export function Lawn(props: any) {
    const LawnRange = props.LawnRange;
    return (<>
        <mesh
            {...props}>
            <boxGeometry args={[LawnRange, 0.2, LawnRange]} />
            <meshToonMaterial color='#578a34' />
        </mesh>
    </>
    );
}