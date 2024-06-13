import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.css";
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
import { div } from "three/examples/jsm/nodes/Nodes.js";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out");
  } catch (error) {
    console.log(error);
  }
};

export const profilePhoto = () => {
  return <img src={photo} />;
};

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.photoURL) {
        setPhoto(currentUser.photoURL);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Signed in with Google");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Container>
        <Row className="my-3">
          <Col>
            <div>
              {user ? `Hi ${user.displayName}` : "You are not logged in"}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {user ? (
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password..."
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" className="m-4" onClick={signIn}>
                    Sign In
                  </Button>
                  <Button
                    variant="secondary"
                    className="m-4"
                    onClick={signInWithGoogle}
                  >
                    Sign In With Google
                  </Button>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container> */}

      {/* <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 bg-grey-900 text-gray-900"
                onChange={(e) => setEmail(e.target.value)}
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  onChange={(e) => setPassword(e.target.value)}
                >
                  Password
                </label>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={signIn}
              >
                Sign in
              </button>

              <button
                class="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a
              href="#"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div> */}

      <div className=" ">
        <div className="">
          {user ? (
            <>
              {user.photoURL && (
                <img
                  className="rounded-full"
                  src={user.photoURL}
                  alt="Profile"
                />
              )}
              {/* <div>Hi {user.displayName}</div> */}
            </>
          ) : (
            <div className="container mt-3">You are not logged in</div>
          )}
          {user ? (
            <button className="btnn-red" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <div className="container">
                <div className="card">
                <div className="flex flex-col">
                  <input
                    id="email"
                    name="email"
                    autocomplete="email"
                    required
                    placeholder="Email..."
                    type="email"
                    className="user-input"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small id="emailHelp" className="ml-2 form-text text-muted">
                    We'll never share your email with anyone.
                  </small>
                </div>
                <input
                  placeholder="Password..."
                  type="password"
                  className="user-input"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btnn" onClick={signIn}>
                  Sign In
                </button>

                <button
                  className="btnn"
                  onClick={signInWithGoogle}
                >
                  Sign In With Google
                </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
