import React, { useState } from "react";
import { Card, Button, Row, Col, Form, InputGroup, Container, Spinner, Alert } from "react-bootstrap";
import CustomCarousel from "./CustomCarousel"; // CustomCarousel 컴포넌트 임포트
import axios from "axios"; // axios 임포트
import "./Home.css"; // Home.css 임포트

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showItems, setShowItems] = useState(false);
  const [results, setResults] = useState([]); // 검색 결과 저장
  const [total, setTotal] = useState(0); // 검색 결과 총 개수
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [page, setPage] = useState(1); // 현재 페이지

  // 폼 입력 상태 (Crawling 관련 코드 그대로 유지)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    startPage: "",
    endPage: "",
    minPrice: "",
    maxPrice: "",
  });

  // 페이지 당 표시할 아이템 수
  const size = 50;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setShowItems(false);
      setResults([]);
      setTotal(0);
      return;
    }

    setShowItems(true);
    setLoading(true);
    setError(null);
    setPage(1); // 검색 시 페이지를 1로 초기화

    try {
      const response = await axios.post("http://localhost:8001/api/v1/search/?host=http%3A%2F%2Flocalhost%3A9200", {
        query: searchQuery,
        page: 1,
        size: size,
      });

      setResults(response.data.results);
      setTotal(response.data.total);
    } catch (err) {
      console.error("검색 오류:", err);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(total / size)) return;

    setPage(newPage);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8001/api/v1/search/?host=http%3A%2F%2Flocalhost%3A9200", {
        query: searchQuery,
        page: newPage,
        size: size,
      });

      setResults(response.data.results);
      setTotal(response.data.total);
    } catch (err) {
      console.error("페이지 변경 오류:", err);
      setError("페이지를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 시간 계산 함수 (N분 전, N시간 전, N일 전 등)
  const getTimeAgo = (time) => {
    const now = new Date();
    const diff = now - new Date(time); // 서버에서 받은 registration_date가 문자열이므로 Date 객체로 변환
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
          <h2 className="mt-5 text-center">검색 결과 ({total}개)</h2>

          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {/* 오류 메시지 */}
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {/* 검색 결과 표시 */}
          {!loading && !error && (
            <div className="custom-grid">
              {results.map((product, index) => (
                <Card key={index} className="product-card">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <Card.Img variant="top" src={product.src} />
                  </a>
                  <Card.Body>
                    <Card.Title className="product-title">{product.title}</Card.Title>
                    <div className="price-time">
                      <span className="product-price">{product.price.toLocaleString()}원</span>
                      <span className="product-time">{product.registration_date}</span>
                    </div>
                    <div className="product-location">{product.location}</div>
                    <Button variant="secondary" href={product.link} target="_blank">
                      상세 보기
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {!loading && !error && total > size && (
            <Row className="justify-content-center my-4">
              <Col md="auto">
                <Button
                  variant="primary"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="me-2"
                >
                  이전
                </Button>
                <span className="align-self-center">
                  페이지 {page} / {Math.ceil(total / size)}
                </span>
                <Button
                  variant="primary"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === Math.ceil(total / size)}
                  className="ms-2"
                >
                  다음
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
