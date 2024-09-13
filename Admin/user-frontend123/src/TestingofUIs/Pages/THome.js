import React, { Suspense, lazy } from 'react'
// import Saleproduct from './Component/Saleproduct'
import ViewProduct from './Component/ViewProduct'
import { Canvas } from '@react-three/fiber';
import Specialproduct from './Component/Specialproduct';
import Category from './Component/Category';

const Saleproduct = lazy(() => import('./Component/Saleproduct'));
const THome = () => {
    return (
        <div>
            <Category />
            <Suspense fallback={<div>Loading...</div>}>
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 6], fov: 30 }}
                    style={{  height: "80vh", width: "auto" }}
                >
                    <Saleproduct />
                </Canvas>
            </Suspense>
            <ViewProduct />
        </div>
    )
}
{/* <div>
<Canvas shadows camera={{ position: [0, 0, 6], fov: 30 }}
    style={{ background: "white", height: "80vh", width: "auto" }}>
    <Saleproduct />
</Canvas>
<ViewProduct />
</div> mke grdient like the in center the is light color and the it spred like circule and the last dark color */}
export default THome