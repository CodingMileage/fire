import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Auth } from "./components/auth";
import MovieDB from "./components/MovieDB";
import Experiance from "./components/Experiance";

function App() {
  return (
    <>
      <div className="App">
        <Auth />
        <MovieDB />
      </div>

      <div className="canvas-container">
        <Canvas>
          <Experiance />
        </Canvas>
      </div>
    </>
  );
}

export default App;
