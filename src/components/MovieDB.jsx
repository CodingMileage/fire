import React from "react";
import { useEffect, useState } from "react";
import { Auth } from "../components/auth";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const MovieDB = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewAward, setIsNewAward] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log({ filterData });
      setMovieList(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        award: isNewAward,
      });

      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

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
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieDB;
