import React, { useEffect, useState, useRef, useMemo } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import JoditEditor from "jodit-react";
import RichText from "./RichText";
import axios from "axios";
import Footer from './Footer'

import { useNavigate } from "react-router-dom";
function EditPost() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [Title, SetTitle] = useState("");
  const [short_disc, Setshort_disc] = useState("");
  const [CategoryData, SetCategoryData] = useState([]);
  const [Category, SetCategory] = useState("");
  const [Cover_img, SetCover_img] = useState("");
  const [Disc, SetDisc] = useState("");
  const navigate = useNavigate()
  const token = localStorage.getItem("access-token");
  const user = localStorage.getItem("UserName");
  const id = localStorage.getItem("EDIT_ID");
  console.log(Category);
  const GetCategory = () => {
    axios
      .get("http://localhost:8000/api/v1/blog/category/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        SetCategoryData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const HandleSubmitEvent = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('cover_img', Cover_img);
      formData.append('title' ,Title )
      formData.append('short_discription' ,short_disc )
      formData.append('category' ,Category )
      formData.append('detail_discription' ,content )

      await axios.post(`http://localhost:8000/api/v1/blog/Update/${id}/`, formData ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  

      alert('successfully Updated blog ...')
      navigate('/home')
      
  } catch (error) {
      console.log(error);
  }
  }
  useEffect(() => {
    GetCategory();
    axios
      .get(`http://localhost:8000/api/v1/blog/view/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContent(res.data.data.detail_discription);
        SetTitle(res.data.data.title);
        Setshort_disc(res.data.data.short_discription);
        SetCategory(res.data.data.category);
        SetCover_img(res.data.data.cover_img);
      })
      .catch((err) => alert(err));
  }, []);

console.log(Category)

  return (
    <div className="Create">
      <div className="blogBanner">
        <h1 className="amita-bold">Edit Your Blog Now And customize  it..!</h1>
      </div>
      <div className="FORMCONT">
        <div className="form">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
                className="amita-regular"
              >
                TITLE
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter title"
                style={{ height: 60, fontSize: 20 }}
                value={Title}
                onChange={(e) => SetTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
                className="amita-regular"
              >
                SHORT DISCRIPTION
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="short discription"
                style={{ height: 60, fontSize: 20 }}
                value={short_disc}
                onChange={(e) => Setshort_disc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
                className="amita-regular"
              >
                DISCRIPTION
              </Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="discription"
                style={{ height: 60, fontSize: 20 }}
              /> */}
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
                className="amita-regular"
              >
                CATEGORY
              </Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Category"
                style={{ height: 60, fontSize: 20 }}
                value={Category}
                onChange={(e) => SetCategory(e.target.value)}
              /> */}
              <select
                name=""
                id=""
                style={{
                  height: 30,
                  background: "#212529",
                  color: "wheat",
                  border: "1px solid #3b3b3b",
                }}
                value={Category}
                onChange={(e) => SetCategory(e.target.value)}
              >
                <option>select</option>
                {CategoryData.map((item) => (
                  <option
                    value={item.id}
                    key={item.id}
                    style={{ marginLeft: 10 }}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
                className="amita-regular"
              >
                UPLOAD A IMAGE
              </Form.Label>
              <br />
              <label htmlFor="" className="" style={{ fontSize: 22, fontWeight: 200, color: "wheat" ,margin:10}}>IMG =<span style={{color:'blue' , fontStyle:'italic'}}>img</span> </label>
              <Form.Control
                type="file"
                placeholder="Category"
                accept="image/*"
                style={{ height: 60, fontSize: 20 }}
                onChange={(e) => SetCover_img(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="DRAFT"
                style={{ fontSize: 25, fontWeight: 200, color: "wheat" }}
                className="amita-regular"
                // value={Title}
                onChange={(e) => SetTitle(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              style={{
                width: "100%",
                padding: 10,
                fontSize: 20,
                fontWeight: 200,
              }}
              className="amita-regular"
              onClick={HandleSubmitEvent}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditPost;
