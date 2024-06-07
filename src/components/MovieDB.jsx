import { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { db, auth, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import {getStorage, ref, uploadBytes} from "firebase/storage"
// import { Button } from "react-bootstrap";

const MovieDB = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewAward, setIsNewAward] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  
  const [fileUpload, setFileUpload] = useState(null);


  const moviesCollectionRef = collection(db, "movies");
  // console.log(moviesCollectionRef)

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id, ) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });

  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        award: isNewAward,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `music/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  

  return (
    <>
      <div>
        <input
          placeholder="Movie Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release"
          type="number"
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isNewAward}
          onChange={(e) => setIsNewAward(e.target.checked)}
        />
        <label>Recieved Award</label>
        <button class="btn btn-primary" onClick={onSubmitMovie}>
          Submit
        </button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.award ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button
              class="btn btn-danger"
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>

            <input 
              placeholder="New Title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button 
              class="btn btn-info"
              onClick={() => updateMovieTitle(movie.id)}>
              Update Title
              </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File </button>
      </div>
    </>
  );
};

export default MovieDB;
