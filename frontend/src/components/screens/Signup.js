import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    try {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        M.toast({
          html: "Please enter a valid email",
          classes: "#e53935 red darken-1",
        });
        return;
      }
      const res = await fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      });

      const data = await res.json();
      if (data.error) {
        M.toast({
          html: data.error,
          classes: "#e53935 red darken-1",
        });
      } else {
        M.toast({
          html: "signed up successfully",
          classes: "#4caf50 green",
        });
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Socio Buzz</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #42a5f5 blue darken-1"
          onClick={() => postData()}
        >
          SignUp
        </button>
        <h5>
          <Link to="/signin"> Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
