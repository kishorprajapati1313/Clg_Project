import React, {  useRef } from "react";
import {  useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model2({ hovered, ...props }) {
    const fbxModel = useFBX("/Model/test3.fbx");
    const group = useRef();

    useFrame(() => {
        if (group.current) {
            if (!hovered) {
                group.current.rotation.y += 0.1; // Adjust the speed as needed
              }else{
                group.current.rotation.y += 0.01; // Adjust the speed as needed
              }

        }
    });

    return fbxModel ? (
        <group ref={group} >
            <primitive object={fbxModel} scale={2} />
        </group>
    ) : null;
}


useFBX.preload("/Model/test3.fbx");
