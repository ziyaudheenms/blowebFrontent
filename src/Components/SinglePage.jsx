import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import ReactHtmlParser  from 'html-react-parser';

function SinglePage() {
  const [Data, SetData] = useState({});
  const [myWork, SetmyWork] = useState([]);
  const [Comments, SetComments] = useState([]);
  const [Text, SetText] = useState("");
  const token = localStorage.getItem("access-token");
  const id = localStorage.getItem("Card-Key");
  const navigate = useNavigate()

  const GetSuggestions = (q) => {
    axios
      .get("http://localhost:8000/api/v1/blog/view/suggestion/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: q,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        SetmyWork(res.data.data);
      })
      .catch((err) => alert(err));
  };
  const GetComment = () => {
    axios
      .get(`http://localhost:8000/api/v1/blog/comments/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        SetComments(res.data.data);
      })
      .catch((err) => console.log(err));
  };
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
  const GetPost = () => {
    axios
    .get(`http://localhost:8000/api/v1/blog/view/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      SetData(res.data.data);
      GetSuggestions(res.data.data.username);
      GetComment();
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
   GetPost()
  }, []);
  const TEXTHTML = `${Data.detail_discription}`
  console.log(typeof(TEXTHTML));
  return (
    <div>
      <div
        className="CustomContainer"
        style={{
          padding: 30,
        }}
      >
        <div
          className="page"
          style={{
            width: "100%",
            height: 600,
          }}
        >
          <div
            className="TOP"
            style={{
              width: "100%",
              marginBottom: 10,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              className="LeftTop"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
            >
              <div
                className="logo"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  marginRight: 5,
                  border: "2px solid rgb(238, 64, 93)",
                  padding: 2,
                }}
              >
                <img
                  src={Data.avatar_img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                  }}
                />
              </div>
              <div className="AUTHOR" style={{}}>
                <h4
                  className="text-light"
                  style={{
                    fontSize: "24px",
                    marginLeft: 10,
                  }}
                >
                  {Data.username}
                </h4>
                <h6
                  className="text-light"
                  style={{
                    fontStyle: "italic",
                    fontSize: "16px",
                    marginLeft: 10,
                  }}
                >
                  {Data.profession}
                </h6>
              </div>
            </div>

            <div
              className="RightTop"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <div
                className="likes"
                style={{
                  margin: 5,
                  display: "flex",
                  // alignItems:'center',
                  justifyContent: "flex-end",
                }}
              >
                <h6
                  style={{
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  <i
                    class="bi bi-heart"
                    style={{
                      color: "rgb(238, 64, 93)",
                    }}
                    onClick={() => {
                      HandleLikeUpdate(Data.id)
                      GetPost()
                    }}
                  ></i>{" "}
                  {Data.like_Count}
                </h6>
              </div>
              <div
                className="Views"
                style={{
                  margin: 5,
                  display: "flex",
                  // alignItems:'center',
                  justifyContent: "flex-end",
                }}
              >
                <h6
                  style={{
                    color: "white",
                    fontSize: "18px",
                    padding: 10,
                    borderRadius: 10,
                    background: "rgb(238, 64, 93)",
                  }}
                >
                  {Data.category}
                </h6>
              </div>
            </div>
          </div>
          <div
            className="img"
            style={{
              width: "100%",
              height: 400,
              borderRadius: 10,
              background: "orange",
              marginBottom: 10,
            }}
          >
            <img
              src={Data.cover_img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
            />
          </div>
          <div className="discription my-3">
            <h1
              className="text-light"
              style={{
                fontSize: 30,
              }}
            >
              {Data.title}
            </h1>
            <p
              className="my-3"
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 200,
              }}
            >
              {ReactHtmlParser(TEXTHTML)}
            </p>
          </div>

          <div className="MoreSuggestion my-3">
            <h3
              className="text-light"
              style={{
                padding: 10,
                background: "rgb(238, 64, 93)",
                borderRadius: 10,
                display: "inline-block",
                marginBottom: 20,
              }}
            >
              More from the Creator
            </h3>
            <div
              className="SUGGESTIONSLIDER"
              style={{
                display: "flex",
                overflowX: "scroll",
              }}
            >
              {myWork.map((item) => (
                <div className="CARD">
                  <div
                    className="top"
                    style={{ backgroundImage: `url(${item.cover_img})` }}
                    onClick={() => {
                      localStorage.setItem('Card-Key' , item.id)
                      window.location.reload()
                    }}
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
                      <div
                        className="logoImg"
                        style={{ backgroundImage: `url(${item.avatar_img})` }}
                      ></div>
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
                      ></i>
                      <h6 style={{ color: "rgb(238, 64, 93)" }} >
                        {item.like_Count}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="Comments my-3">
            <h1
              style={{
                color: "wheat",
                fontSize: 30,
              }}
            >
              Top Comments
            </h1>

            <div className="CommenFeild">
              <input
                type="text"
                style={{
                  width: "50%",
                  fontSize: 20,
                  height: "50px",
                  border: "2px solid rgb(238, 64, 93)",
                  borderRadius: 10,
                  marginRight: 5,
                  fontStyle: "italic",
                  padding: 5,
                }}
                placeholder="post your comment here"
                value={Text}
                onChange={(e) => SetText(e.target.value)}
              />

              <button
                style={{
                  height: "50px",
                  paddingRight: 28,
                  border: "none",
                  fontSize: 16,
                  color: "wheat",
                  paddingLeft: 28,
                  borderRadius: 10,
                  background: "rgb(238, 64, 93)",
                }}
                onClick={() => {
                  axios
                    .post(
                      `http://localhost:8000/api/v1/blog/comments/create/${Data.id}/`,
                      {
                        text:Text
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      if (res.data.stauts_code == 5000){
                        console.log(res.data);
                        GetComment();
                        SetText('')
                      }
                      else{
                        alert('first build your profile')
                        navigate('/BuildProfile')
                      }
                      
                    })
                    .catch((err) => alert(err));
                }}
              >
                POST
              </button>
            </div>
            <div className="comments my-3">
              {Comments.map((item) => (
                <div
                  className="COMMENTBOX"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <div
                    className="COMMENTUSERLOGO"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      background: "green",
                      backgroundImage: `url(${item.avatar_img})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      marginRight: 10,
                    }}
                  ></div>
                  <div className="COMMENTUSERTEXT ">
                    <h6
                      style={{
                        color: "grey",
                        fontSize: 12,
                        fontStyle: "italic",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          color: "rgb(238, 64, 93)",
                          fontSize: 18,
                          fontStyle: "normal",
                        }}
                      >
                        {item.username}
                      </span>{" "}
                      {item.date}{" "}
                    </h6>
                    <h5
                      style={{
                        color: "white",
                      }}
                    >
                      {item.text}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default SinglePage;
