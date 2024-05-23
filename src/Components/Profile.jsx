import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Profile() {
  const [show, Setshow] = useState(false);
  const [Data, SetData] = useState([]);
  const [myWork, SetmyWork] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access-token");
  const id = localStorage.getItem("UserProfileID");
  const Load = () => {
    axios
      .get("http://localhost:8000/api/v1/blog/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.status_code);
        if (res.data.status_code == 5000) {
          SetData(res.data.data);
          axios
            .get("http://localhost:8000/api/v1/blog/view/myProject/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              SetmyWork(res.data.data);
            })
            .catch((err) => console.log(err));
        } else {
          navigate("/buildprofile");
        }
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    Load();
  }, []);
  return (
    <>
      <div className="Profile">
        <div className="ProfileTab">
          <div className="left">
            <img src={Data.avatar_img} alt="" />
            <div className="LeftBottom ">
              <Button
                variant="outline-danger"
                className="mx-2 fs-5 btn"
                onClick={() => {
                  localStorage.setItem("user-profile", Data.id);
                  navigate("/EditProfile");
                }}
              >
                Edit
              </Button>
              <Button
                variant="outline-primary"
                className="fs-5 btn"
                onClick={() => {
                  navigate("/Create");
                }}
              >
                Create
              </Button>
            </div>
          </div>
          <div className="right my-3">
            <h1 className="text-light" style={{ fontWeight: 400 }}>
              <i class="bi bi-person-square" style={{ fontSize: 25 }}></i>{" "}
              {Data.username}
            </h1>
            <h6
              className=" email"
              style={{ fontWeight: 400, fontStyle: "italic" }}
            >
              <i class="bi bi-envelope"></i> {Data.Gmail_id}
            </h6>

            <h6
              className="text-center"
              style={{
                fontWeight: 400,
                fontStyle: "italic",
                color: "#fff",
                padding: "5px",
                backgroundColor: "rgb(238, 64, 93)",
                borderRadius: "6px",
                width: "50%",
                fontSize: "14px",
              }}
            >
              INDIA
            </h6>
            <h6 className="text-light fs-4" style={{ fontWeight: 300 }}>
              {Data.profession}
            </h6>
          </div>
        </div>
      </div>
      <div className="Stats my-3">
        <div className="Stats_item">
          <i class="bi bi-person-add"></i> {Data.comments_written} comments
          written
        </div>
        <div className="Stats_item">
          <i class="bi bi-heart"></i> {Data.Likes_given} Likes given
        </div>
      </div>
      <div className="bio my-3">
        <div className="bioLeft">
          <h1>
            {Data.first_name} {Data.last_name}
          </h1>
          <p>{Data.about_you}</p>
        </div>
        <div className="bioRight">
          <div>
            <h1>Connect me..</h1>
          </div>
          <div>
            <h6>
              {" "}
              <i class="bi bi-chat-left-text-fill"></i> {Data.Gmail_id}
            </h6>
            <h6>
              <i class="bi bi-facebook"></i> {Data.facebook_id}
            </h6>
            <h6>
              <i class="bi bi-instagram"></i> {Data.instragram_id}
            </h6>
            <h6>
              <i class="bi bi-twitter-x"></i> {Data.twitter_id}
            </h6>
          </div>
        </div>
      </div>

      <div className="Performance">
        <div className="PerformCard">
          <h2 className="text-light">
            <i class="bi bi-pencil-square"></i> TOTAL POSTS
          </h2>
          <h4 className="text-light">{Data.total_posts}</h4>
        </div>
        <div className="PerformCard">
          <h2 className="text-light">
            <i class="bi bi-star"></i> BLOWEB RATING
          </h2>
          <h4 className="text-light">{Data.bloweb_rating}</h4>
        </div>
        <div className="PerformCard">
          <h2 className="text-light">
            <i class="bi bi-person-down"></i> BLOWEB MEMBER
          </h2>
          <h4 className="text-light">{Data.bloweb_member}</h4>
        </div>
      </div>

      <div className="myWorks">
        <div
          className="ARROW my-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            className="text-light"
            style={{ fontWeight: 200, fontSize: 35, textAlign: "left" }}
          >
            YOUR POSTS
          </h1>
          {show ? (
            <i
              class="bi bi-arrow-up-circle text-light fs-2"
              onClick={() => Setshow(!show)}
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: "1px",
                paddingBottom: "1px",
                backgroundColor: "rgb(238, 64, 93)",
                borderRadius: 10,
              }}
            ></i>
          ) : (
            <i
              class="bi bi-arrow-down-circle text-light fs-2"
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: "1px",
                paddingBottom: "1px",
                backgroundColor: "rgb(238, 64, 93)",
                borderRadius: 10,
              }}
              onClick={() => Setshow(!show)}
            ></i>
          )}
        </div>
        {show ? (
          <div className="show">
            {myWork.map((item) => (
              <div className="CARD" style={{ width: "400px" }} key={item.id}>
                <div
                  className="top"
                  style={{ backgroundImage: `url(${item.cover_img})` }}
                >
                  <div className="label">
                    <h6>{item.category}</h6>
                  </div>
                </div>
                <div className="bottom">
                  <h3>{item.title}</h3>
                  <h6>{item.short_discription}</h6>
                </div>
                <div className="logo" style={{ justifyContent: "center" }}>
                  <Button
                    variant="outline-danger"
                    className="mx-2 fs-5 btn"
                    onClick={() => {
                      axios
                        .get(
                          `http://localhost:8000/api/v1/blog/delete/${item.id}/`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                      Load();
                    }}
                  >
                    <i class="bi bi-trash3"></i> Delete
                  </Button>
                  <Button variant="outline-warning" className=" mx-2 fs-5 btn">
                    <i
                      class="bi bi-pencil-square"
                      onClick={() => {
                        localStorage.setItem("EDIT_ID", item.id);
                        navigate("/EditBlog");
                      }}
                    ></i>{" "}
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
