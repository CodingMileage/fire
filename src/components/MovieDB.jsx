import { useEffect, useState } from "react";
import { Auth } from "./Auth";
import { db, auth, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";

const MovieDB = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewAward, setIsNewAward] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);
  const [fileType, setFileType] = useState("");

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

  const updateMovieTitle = async (id) => {
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



  useEffect(() => {
    getMovieList();
  }, []);

  function SubmitMovie(props) {
    return (
      <button
        onClick={onSubmitMovie}
        className="bg-blue-500 text-white font-medium px-4 py-2 rounded
    hover:bg-blue-600
    "
      >
        {props.children}
      </button>
    );
  }

  return (
    <>
      <div className="container">
        <div className="m-2">
          <input
            className="user-input"
            placeholder="Movie Title"
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            className="user-input"
            placeholder="Release"
            type="number"
            required
            onChange={(e) => setNewReleaseDate(e.target.value)}
          />
          <div>
            <input
              className="m-2"
              type="checkbox"
              checked={isNewAward}
              onChange={(e) => setIsNewAward(e.target.checked)}
            />
            <label>Recieved Award</label>
          </div>
          {/* <button
            class="bg-blue-500 text-white font-medium px-4 py-2 rounded
    hover:bg-blue-400"
            onClick={onSubmitMovie}
          >
            Submit
          </button> */}
          <SubmitMovie>Submit</SubmitMovie>
        </div>
      </div>

      <div className="container p-4">
        {movieList.map((movie) => (
          <div>
            <h1 className="" style={{ color: movie.award ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <input
              className="user-input"    
              placeholder="New Title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button
              className="btnn"
              onClick={() => updateMovieTitle(movie.id)}
            >
              Update Title
            </button>
            <button
              className="btnn-red"
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="container">
        <input
          className="p-2"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (
              file &&
              (file.type.includes("audio") || file.type.includes("image"))
            ) {
              setFileUpload(e.target.files[0]);
              setFileType(e.target.files[0].type);
            } else {
              alert("File must be audio or image file!");
              setFileUpload(null);
              setFileType("");
            }
          }}
        />
        <button
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded
    hover:bg-blue-400"
          onClick={uploadFile}
        >
          Upload File
        </button>
        <div>{fileType}</div>
      </div>

      {/* <Container>
        <Form>
          <Row>
            <Col md>
              <Form.Group>
                <Form.Control
                  placeholder="Movie Title"
                  onChange={(e) => setNewMovieTitle(e.target.value)}
                />

                <Form.Control
                  type="checkbox"
                  checked={isNewAward}
                  onChange={(e) => setIsNewAward(e.target.checked)}
                />
              </Form.Group>
            </Col>

            <Col md>
              <Form.Control
                placeholder="Release"
                type="number"
                onChange={(e) => setNewReleaseDate(e.target.value)}
              />
            </Col>
            <Col md>
              <Button class="btn btn-primary" onClick={onSubmitMovie}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Form>
          <Row>
            <Col></Col>
          </Row>
        </Form>
      </Container> */}

      {/* <Container>
        <Row>
          <Col>
            <div>
              {movieList.map((movie) => (
                <div>
                  <h1 style={{ color: movie.award ? "green" : "red" }}>
                    {movie.title}
                  </h1>
                  <p>Date: {movie.releaseDate}</p>

                  <input
                    placeholder="New Title..."
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                  <button
                    class="btn btn-info"
                    onClick={() => updateMovieTitle(movie.id)}
                  >
                    Update Title
                  </button>

                  <button
                    class="btn btn-danger"
                    onClick={() => deleteMovie(movie.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container> */}

      {/* <Container>
        <Form>
          <Row>
            <Col>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (
                      file &&
                      (file.type.includes("audio") ||
                        file.type.includes("image"))
                    ) {
                      setFileUpload(e.target.files[0]);
                      setFileType(e.target.files[0].type);
                    } else {
                      alert("File must be audio or image file!");
                      setFileUpload(null);
                      setFileType("");
                    }
                  }}
                />
                <button className="btn btn-info" onClick={uploadFile}>
                  Upload File
                </button>
                <div>{fileType}</div>
              </div>
            </Col>
          </Row>
        </Form>
      </Container> */}
    </>
  );
};

export const uploadFile = async () => {
  if (!fileUpload) return;

  let filesFolderRef;
  if (fileType.includes("audio")) {
    filesFolderRef = ref(storage, `music/${fileUpload.name}`);
  } else if (fileType.includes("image")) {
    filesFolderRef = ref(storage, `image/${fileUpload.name}`);
  } else {
    alert("Please select an audio or image file!");
    setFileUpload(null);
    return;
  }

  try {
    await uploadBytes(filesFolderRef, fileUpload);
    alert("File uploaded successfully!");
  } catch (err) {
    console.error(err);
    alert("File upload failed!");
  } finally {
    setFileUpload(null);
    setFileType("");
  }
};

export default MovieDB;
