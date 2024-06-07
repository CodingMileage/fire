import { OrbitControls } from '@react-three/drei'
import { Office } from './Office'
import React from 'react'

const Experiance = () => {
  return (
    <>
        <ambientLight intensity={1}/>
        <OrbitControls />
        {/* <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}
        <Office />
    </>
  )
}

export default Experiance