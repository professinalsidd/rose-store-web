import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sign_in } from "../redux/actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, error, userInfo } = userSignIn;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sign_in(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to={"/register"}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
