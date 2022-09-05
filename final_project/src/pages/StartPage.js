import { Container } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  const images = useRef([
    {
      src: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    },
    {
      src: "https://w.ryanyang.kr/images/d/d9/%EC%9C%A0%ED%98%B9%ED%95%98%EB%8A%94_%EB%9D%BC%EC%9D%B4%EC%96%B8.png",
    },
    {
      src: "https://www.nicepng.com/png/full/317-3179513_21-.png",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
    display: "felx",
  });
  const imgSize = useRef(images.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        userSelect: "none",
      }}
    >
      <div style={{ transition: "all 0.3s ease-out" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="slide"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="btn"
              onClick={() => {
                moveSlide(-1);
              }}
            >
              &lt;
            </div>
            <div
              className="window"
              style={{
                background: "coral",
                width: "350px",
                height: "250px",

                overflow: "hidden",
              }}
            >
              <div className="flexbox" style={style}>
                {images.current.map((img, i) => (
                  <div
                    key={i}
                    className="img"
                    style={{
                      backgroundImage: `url(${img.src})`,
                      width: "350px",
                      height: "250px",
                      backgroundPosition: "50% 50%",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      flex: "none",
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div
              className="btn"
              onClick={() => {
                moveSlide(1);
              }}
            >
              &gt;
            </div>
          </div>
          <div className="position">
            {images.current.map((x, i) => (
              <div
                key={i}
                className={i === current ? "dot current" : "dot"}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <p />
      <button
        style={{ marginTop: "100px" }}
        onClick={() => navigate("/login:write")}
      >
        로그인하러가기
      </button>
    </Container>
  );
}