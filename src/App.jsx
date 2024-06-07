import "./App.css";
import { Auth } from "./components/auth";
import MovieDB from "./components/MovieDB";

function App() {
  return (
    <>
      <div className="App">
        <Auth />
        <MovieDB />
      </div>
    </>
  );
}

export default App;
