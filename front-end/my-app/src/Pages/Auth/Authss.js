import React, { useState, useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/Dataprovider/Dataprovider";
import classes from "./SignUp.module.css";
import { Type } from "../../Utility/action.Type";

const Authss = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData= useLocation()
  console.log(navStateData)

  // SIGN IN
  const signInHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading({ ...loading, signIn: true });
    setError("");
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });
      setLoading({ ...loading, signIn: false });
navigate(navStateData?.state?.redirect || "/");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError(err.message);
      }
      setLoading({ ...loading, signIn: false });
    }
  };

  // SIGN UP
  const signUpHandler = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, signUp: true });
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });
      setLoading({ ...loading, signUp: false });
 navigate(navStateData?.state?.redirect || "/");
    } catch (err) {
      setError(err.message);
      setLoading({ ...loading, signUp: false });
    }
  };
  return (
    <div className={classes.login_container}>
      <div className={classes.login_box}>
        {/* Amazon logo */}
        <Link to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className={classes.login_logo}
          />
        </Link>

        <h1>Sign in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        {/* SIGN IN FORM */}
        <form onSubmit={signInHandler}>
          <label htmlFor="email">E-mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
          <button
            type="submit"
            disabled={loading.signIn || !email || !password}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p className={classes.terms}>
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{" "}
          and <a href="#">Privacy Notice</a>.
        </p>

        {/* SIGN UP BUTTON */}
        <button
          onClick={signUpHandler}
          className={classes.create}
          disabled={loading.signUp || !email || !password}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Authss;