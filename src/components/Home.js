// src/components/Home.js
import React, { useState } from "react";
import { Card, Button, Row, Col, Form, InputGroup, Container } from "react-bootstrap";
import CustomCarousel from "./CustomCarousel"; // CustomCarousel 컴포넌트 임포트
import "./Home.css"; // Home.css 임포트

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showItems, setShowItems] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setShowItems(true);
    } else {
      setShowItems(false);
    }
  };

  // 시간 계산 함수 (N분 전, N시간 전, N일 전 등)
  const getTimeAgo = (time) => {
    const now = new Date();
    const diff = now - time;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) return `${years}년 전`;
    if (months > 0) return `${months}달 전`;
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return `${minutes}분 전`;
  };

  const imageUrls = [
    "https://media.bunjang.co.kr/product/298061152_1_1731052624_w480.jpg",
    "https://media.bunjang.co.kr/product/298584977_1_1730801925_w266.jpg",
    "https://media.bunjang.co.kr/product/287443439_1_1725251319_w266.jpg",
    "https://media.bunjang.co.kr/product/293404084_1_1728490129_w266.jpg",
    "https://media.bunjang.co.kr/product/297838529_1_1730792490_w266.jpg",
  ];

  const productNames = [
    "발렌시아가 팬츠 xs (32~34)",
    "갤러리디파트먼트 후드집업 M",
    "셀린느 버킷햇 M",
    "몽클레어 패딩 산베산 5",
    "발렌시아가 카고 스니커즈 44",
  ];

  const items = Array.from({ length: 50 }, (_, index) => {
    const imageIndex = index % imageUrls.length;
    const price = Math.floor((Math.random() * 90000) / 100) * 1000 + 10000;
    const postedTime = new Date(Date.now() - Math.floor(Math.random() * 100 * 24 * 60 * 60 * 1000));

    return {
      id: index + 1,
      name: productNames[imageIndex],
      image: imageUrls[imageIndex],
      price: price.toLocaleString() + "원",
      time: getTimeAgo(postedTime),
    };
  });

  return (
    <Container fluid>
      {/* 검색 바 */}
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Form onSubmit={handleSearch} className="search-bar">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="원하는 상품을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" type="submit">
                검색
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Custom Carousel */}
      <Row className="mt-4">
        <Col>
          <CustomCarousel />
        </Col>
      </Row>

      {/* 검색 결과로 보여질 상품 */}
      {showItems && (
        <>
          <h2 className="mt-5 text-center">검색 결과</h2>
          <div className="custom-grid">
            {items.map((product) => (
              <Card key={product.id} className="product-card">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title className="product-title">{product.name}</Card.Title>
                  <div className="price-time">
                    <span className="product-price">{product.price}</span>
                    <span className="product-time">{product.time}</span>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 추천 상품 */}
      {!showItems && (
        <>
          <h2 className="mt-5 text-center">추천 상품</h2>
          <Row>
            {items.slice(0, 5).map((product) => (
              <Col md={4} className="mt-3" key={product.id}>
                <Card>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>이곳에 상품 {product.id}에 대한 설명을 입력하세요.</Card.Text>
                    <Button variant="primary">자세히 보기</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Home;
