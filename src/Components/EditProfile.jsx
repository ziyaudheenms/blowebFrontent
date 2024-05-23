import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

function EditProfile() {
    const [FirstName, SetFirstName] = useState("");
    const [LastName, SetLastName] = useState("");
    const [profession, Setprofession] = useState("");
    const [aboutYou, SetaboutYou] = useState("");
    const [facebook, Setfacebook] = useState("");
    const [insta, Setinsta] = useState("");
    const [twitter, Settwitter] = useState("");
    const [Image, setImage] = useState(null);
    const token = localStorage.getItem("access-token");
    const id = localStorage.getItem("user-profile");
    const navigate = useNavigate()
  
  const HandleSubmitEvent = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('avatar_img', Image);
      formData.append('first_name' ,FirstName )
      formData.append('last_name' ,LastName )
      formData.append('profession' ,profession )
      formData.append('about_you' ,aboutYou )
      formData.append('facebook_id' ,facebook )
      formData.append('instragram_id' ,insta )
      formData.append('twitter_id' ,twitter )
      await axios.post(`http://localhost:8000/api/v1/blog/Update/Profile/${id}/`, formData ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => console.log(res))

    //   alert('successfully Updated profile ...')
      navigate('/home')

      
  } catch (error) {
      console.log(error);
  }
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/blog/profile/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        SetFirstName(res.data.data.first_name);
        SetLastName(res.data.data.last_name);
        Setprofession(res.data.data.profession);
        SetaboutYou(res.data.data.about_you);
        Setfacebook(res.data.data.facebook_id);
        Setinsta(res.data.data.instragram_id);
        Settwitter(res.data.data.twitter_id);
        setImage(res.data.data.avatar_img);
      })
      .catch((err) => alert(err));
  }, []);


  return (
    <div className="Create">
      <div className="blogBanner">
        <h1 className="amita-bold">Edit Your profile Now And customize  it..!</h1>
      </div>
      <div className="FORMCONT">
        <div className="form">
        <Form
          style={{
            padding: 25,
            width: "100%",
            borderRadius: 10,
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
            onClick={HandleSubmitEvent}
          >
            <i class="bi bi-person"></i> Update
          </Button>
        </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
