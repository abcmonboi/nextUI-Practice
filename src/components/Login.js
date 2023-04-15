import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {handleLoginRedux} from "../redux/actions/userActions";
import { useDispatch,useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const {isLogging,auth,account} = useSelector(state => state.user);
  const handleLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      toast.error("Email or password is empty");
      return;
    } else {
    dispatch( handleLoginRedux(email.trim(),password.trim()));
    
    }
   
  };
  useEffect(() => {
    if (auth && localStorage.getItem("token")) {
      toast.success("Welcome back " + account.email);
      navigate("/");
    } else if (auth === false && isLogging === false) {
      toast.error("Wrong email or password");
    }
    //eslint-disable-next-line
  },[auth,isLogging]);

  return (
    <>
      <div className="login-container col-lg-8 col-sm-6  col-xl-4">
        <div className="title text-white">Log in</div>
        <div className=" text-white">{"Email or username"}</div>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          placeholder="eve.holt@reqres.in"
          type="text"
          className="input"
        />
        <div className="position-relative">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="cityslicka"
            type={isShow ? "text" : "password"}
            className="input w-100 "
          />
          <i
            onClick={() => {
              setIsShow(!isShow);
            }}
            role="button"
            className={
              isShow
                ? "fa-solid fa-eye-slash eye-watch"
                : "fa-solid fa-eye eye-watch"
            }
          />
        </div>
        <button
          disabled={email.length === 0 || password.length === 0 || isLogging}
          className="btn btn-dark mt-3 "
          onClick={() => {
            handleLogin();
          }}
        >
          {isLogging ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            "Log in"
          )}
        </button>
        <div role="button" className="mt-5 text-center  text-white ">
          <Link to="/" className="nav-link">
            <i className="fa-solid fa-house"></i>
            <span className="fw-semibold fs-6 ">
              <u> Home</u>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
