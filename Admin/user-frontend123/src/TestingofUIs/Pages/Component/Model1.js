import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX } from "@react-three/drei";
import { AnimationMixer, Group } from 'three';
import { useFrame } from "@react-three/fiber";


// export function Model1() {
//     const fbxModel = useFBX("/Model/test3.fbx");

//     return fbxModel ? <primitive object={fbxModel} scale={2}/> : null;
// }

export function Model1({ hovered, ...props }) {
    const fbxModel = useFBX("/Model/test2.fbx");
    const group = useRef();

    useFrame(() => {
        if (group.current) {
            if (!hovered) {
                group.current.rotation.y += 0.1; // Adjust the speed as needed
            } else {
                group.current.rotation.y += 0.01; // Adjust the speed as needed
            }
        }
    });

    return fbxModel ? (
        <group ref={group}>
            <primitive object={fbxModel} scale={0.02} />
        </group>
    ) : null;
}


useFBX.preload("/Model/test2.fbx");
