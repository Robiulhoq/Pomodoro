import React, { useState } from "react";
import logo from "../../image/icon-white.png";
import firebaseConfig from "./firebase.config";
import koders_logo from "../../image/koders_logo.png";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { addUserEmail } from "../StateManager/Action";
import { connect } from "react-redux";
const Login = (props) => {
  initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const hendleGoogleSingIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const {email} = result.user;
        if(email){
          props.addEmail(email)
          alert("Login Success")
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const [addUser, setAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  console.log(newUser);
  const hendleBlur = (e) => {
    const newUserInfo = { ...newUser };
    newUserInfo[e.target.name] = e.target.value;
    setNewUser(newUserInfo);
  };
  const hendleCreateUser = (event) => {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        // Signed in
        const {email} = userCredential.user;
        if(email){
          props.addEmail(email)
          alert("Create Account Success")
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    event.preventDefault();
  };
  const hendleEmailLogin = (event) =>{
    signInWithEmailAndPassword(auth, newUser.email, newUser.password)
  .then((userCredential) => {
    // Signed in 
    const {email} = userCredential.user;
    if(email){
      props.addEmail(email)
      alert("Login success")
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
  event.preventDefault();
  }
  return (
    <div className="login_container">
      <div className="container">
      <div className="d-flex justify-content-center">
        <Link to='/'><div className=" d-flex login_logo_container align-items-center">
          <img className="img-fluid login_logo" src={koders_logo} alt="" />
          
        </div></Link>
      </div>
      <div className="login_form_container m-5 p-5 d-flex justify-content-center mt-5">
        <div>
          <button onClick={hendleGoogleSingIn} className="google_btn btn">
            <span>
              <img
                className="google_icon"
                src="https://pomofocus.io/icons/g-logo.png"
                alt=""
              />
            </span>{" "}
            Login With Google
          </button>
          <br />
          <br />
          <div className="underline_three"></div>
          <br />
          <br />
         { addUser === false? <div>
          <form action="">
            <label className="label" htmlFor="">
              EMAIL
            </label>
            <input
              type="text"
              name="email"
              onBlur={hendleBlur}
              className="form-control login_from"
              placeholder="example@gmail.com"
            />
            <br />
            <label className="label" htmlFor="">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              onBlur={hendleBlur}
              className="form-control login_from"
            />
            <br />
            <button
              className="btn btn_save form-control"
              type="submit"
              placeholder="Login in With Email"
              onClick={hendleEmailLogin}
            >Login</button>
            
          </form>
          <button className='btn btn_save' onClick={()=> setAddUser(true)}>Dont have an account</button>
         </div>

:

          <form action="">
            <label className="label" htmlFor="">
              EMAIL
            </label>
            <input
              type="text"
              name="email"
              onBlur={hendleBlur}
              className="form-control login_from"
              placeholder="example@gmail.com"
            />
            <br />
            <label className="label" htmlFor="">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              onBlur={hendleBlur}
              className="form-control login_from"
            />
            <br />
            <button
              className="btn btn_save form-control"
              type="submit"
              placeholder="Login in With Email"
              onClick={hendleCreateUser}
            >Create Account</button>
            <button className='btn btn_save' onClick={()=> setAddUser(false)}>Have account</button>
          </form>}
        </div>
      </div>
    </div>
    </div>
  );
};

function mapToDispatch(dispatch){
  return{
    addEmail: (newEmail)=>{
      dispatch(addUserEmail(newEmail))
    }
  }
}

export default connect(null, mapToDispatch)(Login);
