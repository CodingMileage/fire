import { useEffect, useState } from "react";
import { Auth } from "../components/auth";
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

  const uploadFile = async () => {
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

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
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
              onClick={() => updateMovieTitle(movie.id)}
            >
              Update Title
            </button>
          </div>
        ))}
      </div>

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

      <div>
        <input
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
        <button className="btn btn-info" onClick={uploadFile}>
          Upload File
        </button>
        <div>{fileType}</div>
      </div>
    </>
  );
};

export default MovieDB;
