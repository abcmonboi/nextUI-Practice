import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
const Login = () => {
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const handleLogin = async () => {
    setIsLogging(true);
    if (email.length === 0 || password.length === 0) {
      toast.error("Email or password is empty");
      setIsLogging(false);
      return;
    }

    let res = await loginApi(email.trim(), password.trim());
    //   {
    //     eve.holt@reqres.in
    //     cityslicka
    // }

    if (res && res.token) {
      toast.success(`Welcome ${email}`);
      setIsLogging(false);
      loginContext(email.trim(), res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      } else {
        toast.error("Login failed");
      }
      setIsLogging(false);
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

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
          {isLogging ? <i className="fas fa-circle-notch fa-spin"></i> : "Log in"}
        </button>
        <div role="button" className="mt-5 text-center  text-white ">
          <Link to="/" className="nav-link">
            <i class="fa-solid fa-house"></i>
            <span className="fw-semibold fs-6 ">
              <u > Home</u>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
