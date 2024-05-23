import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

function ProfileBuilder() {
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [profession, Setprofession] = useState("");
  const [aboutYou, SetaboutYou] = useState("");
  const [facebook, Setfacebook] = useState("");
  const [insta, Setinsta] = useState("");
  const [twitter, Settwitter] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate()

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('img', image);
      formData.append('FirstName' ,FirstName )
      formData.append('LastName' ,LastName )
      formData.append('profession' ,profession )
      formData.append('aboutYou' ,aboutYou )
      formData.append('facebook' ,facebook )
      formData.append('insta' ,insta )
      formData.append('twitter' ,twitter )
      await axios.post("http://localhost:8000/api/v1/blog/profile/build/", formData ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  

      alert('successfully created Profile ...')
      navigate('/home')
      
  } catch (error) {
      console.log(error);
  }
}

  return (
    <div
      style={{
        backgroundImage:
          'url("https://th.bing.com/th/id/OIP.sXPQZHFZkOIQoZ8ID94SKgHaEo?rs=1&pid=ImgDetMain")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          className="text-light text-center amita-bold"
          style={{
            textShadow: "2px 3px rgb(238, 64, 93)",
            marginTop: "30px",
          }}
        >
          Build Your Profile Here
        </h1>
        <Form
          style={{
            padding: 25,
            marginBottom: 30,
            width: "80%",
            borderRadius: 10,
            marginTop: "50px",
            border: "2px solid #302f2f",
            boxShadow: " 2px 2px #161617",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              FirstName
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter first name"
              style={{ height: "60px", fontSize: 20 }}
              value={FirstName}
              onChange={(e) => SetFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              LastName
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter last name"
              style={{ height: "60px", fontSize: 20 }}
              value={LastName}
              onChange={(e) => SetLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              Profession
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter profession"
              style={{ height: "60px", fontSize: 20 }}
              value={profession}
              onChange={(e) => Setprofession(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              facebook ID
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter facebook"
              required
              style={{ height: "60px", fontSize: 20 }}
              value={facebook}
              onChange={(e) => Setfacebook(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              Instagram ID
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter instagram"
              required
              style={{ height: "60px", fontSize: 20 }}
              value={insta}
              onChange={(e) => Setinsta(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              twitter ID
            </Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter twitter"
              style={{ height: "60px", fontSize: 20 }}
              value={twitter}
              onChange={(e) => Settwitter(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fs-4 text-light amita-regular">
              DESCRIBE ABOUT YOU
            </Form.Label>
            <textarea
              name=""
              id=""
              required
              style={{ width: "100%", height: 100 }}
              value={aboutYou}
              placeholder="describe about you here"
              onChange={(e) => SetaboutYou(e.target.value)}
            ></textarea>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label
              style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
              className="amita-regular"
            >
              UPLOAD PROFILE PIC
            </Form.Label>
            <Form.Control
              type="file"
              required
              placeholder="Category"
              accept="image/*"
              style={{ height: 60, fontSize: 20 }}
              onChange={(e) =>  setImage(e.target.files[0]) }
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ width: "100%", height: 50, fontSize: 20, marginTop: 15 }}
            onClick={handleProfileSubmit}
          >
            <i class="bi bi-person"></i> Create
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileBuilder;
