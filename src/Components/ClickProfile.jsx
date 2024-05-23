import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'

import axios from 'axios';
function ClickProfile() {
  const [Data, SetData] = useState({});
  const [myWork, SetmyWork] = useState([]);
  const navigate = useNavigate()
  const ProfileViewer = () => {
    navigate("/ClickProfile");
  };
  const singlePageFunction = (e) => {
    localStorage.setItem("Card-Key" , e)
    navigate("/SinglePage");
  };
  const token = localStorage.getItem("access-token");
  const ID = localStorage.getItem("UserProfileID");
  const GetSuggestions = (q) => {
    axios.get('http://localhost:8000/api/v1/blog/view/suggestion/' , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: q,
      },
    })
    .then((res) => {
      console.log(res.data.data)
      SetmyWork(res.data.data)
    })
    .catch((err) => alert(err))
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/blog/profile/${ID}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        SetData(res.data.data);
        GetSuggestions(res.data.data.username);

      })
      .catch((err) => console.log(err));
  },[])
  return (
    <div className='p-3'>
        <div className="Profile">
        <div className="ProfileTab">
          <div className="left">
            <img
              src={Data.avatar_img}
              alt=""
            />
            <div className="LeftBottom ">
            
            </div>
          </div>
          <div className="right my-3">
            <h1 className="text-light" style={{ fontWeight: 400 }}>
              <i class="bi bi-person-square" style={{fontSize:25}}></i> {Data.username}
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
          <i class="bi bi-person-add"></i> {Data.comments_written} comments written
        </div>
        <div className="Stats_item">
          <i class="bi bi-heart"></i> {Data.Likes_given} Likes given
        </div>
      </div>
      <div className="bio my-3">
        <div className="bioLeft">
          <h1>{Data.first_name} {Data.last_name}</h1>
          <p>
            {Data.about_you}
          </p>
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
      <div className="MoreSuggestion my-3">
            <h3
              className="text-light"
              style={{
                padding: 10,
                borderRadius: 10,
                fontWeight:200,
                display: "inline-block",
                marginBottom: 20,
              }}
            >
              More from the Blogger
            </h3>
            <div
              className="SUGGESTIONSLIDER"
              style={{
                display: "flex",
                overflowX:'scroll',

              }}
            >
              {myWork.map((item) => (
                  <div  className="CARD">
                  <div className="top" style={{backgroundImage:`url(${item.cover_img})`}} onClick={() => singlePageFunction(item.id)}>
                    <div className="label">
                      <h6>{item.category}</h6>
                    </div>
                  </div>
                  <div className="bottom">
                    <h3>{item.title}</h3>
                    <h6>{item.short_discription}</h6>
                  </div>
                  <div className="logo" onClick={ProfileViewer}>
                    <div className="user">
                      <div className="logoImg" style={{backgroundImage:`url(${item.avatar_img})`}}></div>
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
                          {item.BLOWEB}
                        </h4>
                      </div>
                    </div>
                    <div className="one">
                      <i
                        className="bi bi-heart"
                        style={{ color: "rgb(238, 64, 93)" }}
                        
                      ></i>
                      <h6 style={{ color: "rgb(238, 64, 93)" }}>{item.like_Count}</h6>
                    </div>
                  </div>
                </div>
              ))}
              

              
            </div>
    </div>
     <Footer /> 
    </div>
  )
}

export default ClickProfile
