import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.css";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");

  // console.log(auth.currentUser.displayName);

  useEffect(() => {}, []);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
    console.log("Created");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
    console.log("Created");
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
    console.log("Created");
  };

  return (
    <>
      <div>
        {auth?.currentUser?.displayName
          ? "Hi " + auth.currentUser.displayName
          : null}
      </div>

      <div class="card">
        <div>
          <input
            placeholder="Email..."
            // id="exampleInputEmail1"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          <input
            // class="form-control form-control-sm"
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassord(e.target.value)}
          />

          <button onClick={signIn}> Sign In </button>

          <button onClick={signInWithGoogle}>Sign In With Google</button>

          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};
