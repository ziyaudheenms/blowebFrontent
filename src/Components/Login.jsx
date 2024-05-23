import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

function Login() {
  const [UserName, SetUserName] = useState("");
  const [PassWord, SetPassWord] = useState("");
  const navigate = useNavigate()
  const HandleLoginUser = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/v1/auth/api/token/' , {
      username:UserName,
      password:PassWord
    })
    .then((res) => {
      console.log(res.status)
      if (res.status == 200) {
        console.log(res.data.access);
        localStorage.setItem('access-token' , res.data.access)
        localStorage.setItem('UserName' , UserName)
        navigate('/home')
      } else {
        console.log(res);
      }
    })
    .catch((err) => alert(err.response.data.detail))
  }
  return (
    <div div style={{
        backgroundImage:'url("https://th.bing.com/th/id/OIP.R_WRj6Tirw-P4i-a-O7B-AHaE5?rs=1&pid=ImgDetMain")',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundRepeat:"no-repeat"
    }}>
      <h1 className="text-light text-center amita-bold" style={{
        textShadow:'2px 3px rgb(238, 64, 93)'
      }}>Login Here</h1>
      <div
        className="flex"
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
            marginBottom:30,
            width: "80%",
            borderRadius: 10,
            marginTop: "50px",
            border: "2px solid #302f2f",
            boxShadow:' 2px 2px #161617',
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              style={{ height: "60px", fontSize: 20 }}
              value={UserName}
              onChange={(e) => SetUserName(e.target.value)}
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
            onClick={HandleLoginUser}
          >
            <i class="bi bi-box-arrow-in-right"></i> Login
          </Button>
        </Form>
        <div className="signUp">
          <h4 style={{
            color:'white'
          }}>don't have an account <span style={{
            color:"rgb(238, 64, 93)"
            }} onClick={() => navigate('/signUp')}>
            create an account
            </span>
          </h4>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
