// src/components/Crawl.js
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSpider } from "react-icons/fa"; // FaSpider 아이콘 임포트
import { useSelector, useDispatch } from "react-redux";
import { setCrawlData, resetCrawlData } from "../features/crawl/crawlSlice";
import axios from "axios";
import "./Crawl.css"; // Crawl 관련 CSS 추가 (아래에서 설명)

function Crawl() {
  const [showModal, setShowModal] = React.useState(false);
  const crawlData = useSelector((state) => state.crawl);
  const dispatch = useDispatch();

  // Modal 열기/닫기 핸들러
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // 폼 입력 변경 핸들러 (Redux 사용)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCrawlData({ ...crawlData, [name]: value }));
  };

  // 시작 버튼 핸들러 (API 요청)
  const handleStart = async () => {
    const { productName, startPage, endPage, minPrice, maxPrice } = crawlData;

    // 간단한 유효성 검사
    if (!productName || !startPage || !endPage || !minPrice || !maxPrice) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (Number(startPage) > Number(endPage)) {
      alert("시작페이지는 끝페이지보다 작아야 합니다.");
      return;
    }

    if (Number(minPrice) > Number(maxPrice)) {
      alert("최소가격은 최대가격보다 작아야 합니다.");
      return;
    }

    try {
      // 실제 API 엔드포인트로 변경하세요.
      const response = await axios.post("/api/crawl", crawlData);
      console.log("API 응답:", response.data);
      // 성공 시 추가 로직을 구현하세요.

      // 모달 닫기
      setShowModal(false);
    } catch (error) {
      console.error("API 요청 오류:", error);
      alert("API 요청 중 오류가 발생했습니다.");
    }
  };

  // 내용 초기화 버튼 핸들러 (Redux 사용)
  const handleReset = () => {
    dispatch(resetCrawlData());
  };

  return (
    <>
      {/* 우측 하단 고정 CrawlingIcon */}
      <div className="crawling-icon" onClick={handleOpenModal}>
        <FaSpider size={30} color="#fff" />
      </div>

      {/* Crawling Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crawling 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName" className="mb-3">
              <Form.Label>상품명:</Form.Label>
              <Form.Control
                type="text"
                placeholder="상품명을 입력하세요"
                name="productName"
                value={crawlData.productName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formStartPage" className="mb-3">
              <Form.Label>시작페이지:</Form.Label>
              <Form.Control
                type="number"
                placeholder="시작페이지 번호를 입력하세요"
                name="startPage"
                value={crawlData.startPage}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEndPage" className="mb-3">
              <Form.Label>끝페이지:</Form.Label>
              <Form.Control
                type="number"
                placeholder="끝페이지 번호를 입력하세요"
                name="endPage"
                value={crawlData.endPage}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formMinPrice" className="mb-3">
              <Form.Label>최소가격:</Form.Label>
              <Form.Control
                type="number"
                placeholder="최소가격을 입력하세요"
                name="minPrice"
                value={crawlData.minPrice}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formMaxPrice" className="mb-3">
              <Form.Label>최대가격:</Form.Label>
              <Form.Control
                type="number"
                placeholder="최대가격을 입력하세요"
                name="maxPrice"
                value={crawlData.maxPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            내용 초기화
          </Button>
          <Button variant="primary" onClick={handleStart}>
            시작
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Crawl;
