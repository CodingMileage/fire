import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.css";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created");
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

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div>{user ? `Hi ${user.displayName}` : "You are not logged in"}</div>

      <div className="card mt-3">
        <div className="card-body">
          {user ? (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <input
                placeholder="Email..."
                type="email"
                className="form-control mb-2"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
              <input
                placeholder="Password..."
                type="password"
                className="form-control mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary m-4" onClick={signIn}>
                Sign In
              </button>

              <button
                className="btn btn-secondary m-4"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
