// src/components/CustomCarousel.js
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./CustomCarousel.css"; // 스타일 파일 임포트

function CustomCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  const handleCarouselClick = () => {
    setIsPaused(!isPaused);
    console.log("Carousel clicked. isPaused:", !isPaused);
  };

  return (
    <div onClick={handleCarouselClick} style={{ cursor: "pointer" }}>
      <Carousel
        controls={true}
        indicators={true}
        interval={isPaused ? null : 3000} // isPaused가 true면 자동 슬라이드 중지
        pause={false} // 마우스 호버 시 자동 일시정지 방지
      >
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://static.bunjang.co.kr/cms/1vfQsMZuYz5LhL0LBdRyjItLgcaPByfR8.webp"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://static.bunjang.co.kr/cms/18cpKkK145N0ATeQ2jhZe5xEhjge_kdpk.webp"
            alt="Second slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://static.bunjang.co.kr/cms/1qyUGLRL1ABhzGyVMsT-fxMOXsdYrebkt.webp"
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          style={{
            position: "relative",
            backgroundColor: "#F3F3F3",
            color: "#222",
            textAlign: "center",
          }}
        >
          {/* 좌측 텍스트 */}
          <div className="gradient-box gradient-left">
            <div>패션의 혁신</div>
            <div>진만킴</div>
          </div>

          {/* 이미지 */}
          <img
            src="/man_outfit1.jpg" // 로컬 이미지 사용 시 public 폴더에 이미지 추가
            alt="Fourth slide"
            className="carousel-image"
          />

          {/* 우측 텍스트 */}
          <div className="gradient-box gradient-right">
            <div>뉴브랜드 런칭기념</div>
            <div>리스닝파티</div>
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* 상태 표시 (선택 사항) */}
      <div className="carousel-status">{isPaused ? "슬라이드 일시정지됨" : "슬라이드 재생 중"}</div>
    </div>
  );
}

export default CustomCarousel;
