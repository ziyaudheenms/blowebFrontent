import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import Footer from './Footer'
function Home() {
  const [Likes, SetLikes] = useState(0);
  const [User, SetUser] = useState("");
  const [Data, SetData] = useState([]);
  const [Category, SetCategory] = useState([]);
  const [Search , SetSearch] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem("access-token");
  const GetPosts = () => {
    axios
      .get("http://localhost:8000/api/v1/blog/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        SetData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const GetCategory = () => {
    axios
      .get("http://localhost:8000/api/v1/blog/category/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        SetCategory(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const GetFilter = (q) => {
    axios.get('http://localhost:8000/api/v1/blog/' , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: q,
      },
    })
    .then((res) => {
      console.log(res.data.data)
      SetData(res.data.data)
    })
    .catch((err) => alert(err))
  }
  const SearchFilter = (q) => {
    axios.get('http://localhost:8000/api/v1/blog/search/' , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: q,
      },
    })
    .then((res) => {
      console.log(res.data.data)
      SetData(res.data.data)
    })
    .catch((err) => alert(err))
  }
  const HandleLikeUpdate = (q) => {
    axios
      .get(`http://localhost:8000/api/v1/blog/Like/${q}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        GetPosts();

      })
      .catch((err) => {
        console.log(err)

      });
  }
  useEffect(() => {
    const UserName = localStorage.getItem("UserName");
    SetUser(UserName);

    GetPosts();
    GetCategory();
  }, []);
  const ProfileViewer = (id) => {
    navigate("/ClickProfile");
  };
  const singlePageFunction = () => {
    navigate("/SinglePage");
  };
  return (
    <div className="home">
      <h4
        className="text-light text-center jersey-25-regular"
        style={{
          fontSize: 35,
        }}
      >
        hai{" "}
        <span
          style={{
            fontSize: 40,
            color: "rgb(238, 64, 93)",
          }}
        >
          {User}
        </span>
      </h4>
      <div
        className="Search my-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="Banner"
          style={{
            backgroundColor: "red",
            width: "90%",
            borderRadius: 15,
            display: "flex",
            justifyContent: "center",
            height: 300,
            backgroundImage:
              'url("https://cellulitereductiontherapy.net/wp-content/uploads/2018/04/blog-wallpapers.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <input
            type="text"
            style={{
              width: "50%",
              height: 60,
              marginTop: 265,
              borderRadius: 15,
              border: "4px solid #161617",
              fontSize: 25,
              fontStyle: "italic",
              color: "grey",
              padding: 10,
            }}
            onChange={(e) =>{
                SetSearch(e.target.value)
                SearchFilter(Search)
              
              }}
            placeholder="Search blog here"
          />
        </div>
      </div>
      <div className="Category my-3 pt-3">
        <div className="item mx-1" onClick={GetPosts}>
          <p className="text-center">ALL</p>
        </div>
        {Category.map((item) => (
          <div className="item mx-1" onClick={ () => GetFilter(item.id)}>
            <p className="text-center">{item.title}</p>
          </div>
        ))}
      </div>

      <Row className="View">
        {Data.map((item) => (
          <Col sm={8} md={4} lg={3} className="CARD" onClick={() => {
            localStorage.setItem("Card-Key" , item.id)
          }}>
            <div
              className="top"
              style={{ backgroundImage: `url(${item.cover_img})` }}
              onClick={singlePageFunction}
            >
              <div className="label">
                <h6>{item.category}</h6>
              </div>
            </div>
            <div className="bottom">
              <h3>{item.title}</h3>
              <h6>{item.short_discription}</h6>
            </div>
            <div className="logo">
              <div className="user">
                <div className="logoImg" onClick={() => ProfileViewer(item.id)} style={{backgroundImage:`url(${item.avatar_img})`}}></div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: 200,
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    {item.username}
                  </h4>
                </div>
              </div>
              <div className="one">
                <i
                  className="bi bi-heart"
                  style={{ color: "rgb(238, 64, 93)" }}
                  onClick={() => HandleLikeUpdate(item.id)}
                ></i>
                <h6 style={{ color: "rgb(238, 64, 93)" }}>{item.like_Count}</h6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
}

export default Home;
