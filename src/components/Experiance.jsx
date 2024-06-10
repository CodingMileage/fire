import { OrbitControls } from "@react-three/drei";
import { Office } from "./Office";
// import React from "react";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Experiance = () => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const ref = useRef();

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls />
      <mesh
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry />
        <meshNormalMaterial />
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
      {/* <Office /> */}
    </>
  );
};

export default Experiance;
