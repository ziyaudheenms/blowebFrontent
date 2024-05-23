import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

function SignUp() {
  const [UserName, SetUserName] = useState("");
  const [Email, SetEmail] = useState("");
  const [PassWord, SetPassWord] = useState("");
  const navigate = useNavigate();
  const HandleUserSignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/auth/create/", {
        username: UserName,
        password: PassWord,
        email: Email,
      })
      .then((res) => {
        console.log(res.data.status_code);
        if (res.data.status_code == 5000) {
          navigate("/");
        } else {
          alert('same username exists,try another!!')
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp6693935.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1
        className="text-light text-center amita-bold"
        style={{
          textShadow: "2px 3px rgb(238, 64, 93)",
        }}
      >
        Sign Up Now!
      </h1>
      <div
        className="SignUp"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          style={{
            padding: 25,
            width: "80%",
            borderRadius: 10,
            marginTop: "50px",
            border: "2px solid #302f2f",
            boxShadow: " 2px 2px #161617",
            marginBottom: 30,
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User"
              style={{ height: "60px", fontSize: 20 }}
              value={UserName}
              onChange={(e) => SetUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              style={{ height: "60px", fontSize: 20 }}
              value={Email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fs-4 text-light">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ height: "60px", fontSize: 20 }}
              value={PassWord}
              onChange={(e) => SetPassWord(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ width: "100%", height: 50, fontSize: 20, marginTop: 15 }}
            onClick={HandleUserSignUp}
          >
            <i class="bi bi-check-circle"></i> Sign Up
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
