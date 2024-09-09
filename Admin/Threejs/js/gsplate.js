import * as SPLAT from "./node_modules/gsplat/dist/splats";


const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();
const renderer = new SPLAT.WebGLRenderer();
const controls = new SPLAT.OrbitControls(camera, renderer.canvas);

async function main() {
    const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";

    await SPLAT.Loader.LoadAsync(url, scene, () => {});

    const frame = () => {
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
}

main();