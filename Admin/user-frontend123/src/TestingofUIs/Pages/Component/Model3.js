import React, {  useRef } from "react";
import {  useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model3() {
    const fbxModel = useFBX("/Model/Waving.fbx");
    const group = useRef();

    useFrame(() => {
        if (group.current) {
            // Rotate the model around the Y-axis
            group.current.rotation.y += 0.01; // Adjust the speed as needed
        }
    });

    return fbxModel ? <group ref={group}><primitive object={fbxModel} scale={10} /></group> : null;
}


useFBX.preload("/Model/Waving.fbx");
