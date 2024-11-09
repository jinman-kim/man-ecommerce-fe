// src/components/Brand.js
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function Brand() {
  const brands = [
    {
      name: "브랜드 1",
      description: "브랜드 1에 대한 설명입니다.",
      image: "https://via.placeholder.com/300x200?text=Brand+1",
    },
    {
      name: "브랜드 2",
      description: "브랜드 2에 대한 설명입니다.",
      image: "https://via.placeholder.com/300x200?text=Brand+2",
    },
    {
      name: "브랜드 3",
      description: "브랜드 3에 대한 설명입니다.",
      image: "https://via.placeholder.com/300x200?text=Brand+3",
    },
  ];

  return (
    <div>
      <h2>브랜드</h2>
      <Row>
        {brands.map((brand, index) => (
          <Col md={4} className="mt-3" key={index}>
            <Card>
              <Card.Img variant="top" src={brand.image} />
              <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
                <Card.Text>{brand.description}</Card.Text>
                <Button variant="primary">자세히 보기</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Brand;
