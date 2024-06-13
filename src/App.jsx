import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Auth } from "./components/Auth";
import MovieDB from "./components/MovieDB";
import Experiance from "./components/Experiance";
import Boott from "./components/BootTut/Boott";
import ReactBoot from "./components/BootTut/ReactBoot";
import AudioComponent from "./components/AudioComponent";
import Example from "./components/Example";
import NavBar from "./components/NavBar";
import { label } from "three/examples/jsm/nodes/Nodes.js";
import Music from "./components/Music";


function App() {




  return (
    <>
      {/* <Example /> */}
      <NavBar />
      <Music />
      <div className="App">
        <Auth />
        <MovieDB />
      </div>

      {/* <div className="container p-4">
        <TailWindCSSButton>TailWindCSS</TailWindCSSButton>
      </div> */}

      {/* <AudioComponent /> */}

      {/* <Boott /> */}
      {/* <ReactBoot /> */}

      {/* <div className="canvas-container">
        <Canvas>
          <Experiance />
        </Canvas>
      </div> */}
    </>
  );
}

function TailWindCSSButton(props) {
  return (
    <button
      className="bg-blue-500 text-white font-medium px-4 py-2 rounded
    hover:bg-blue-600
    "
    >
      {props.children}
    </button>
  );
}

export default App;
