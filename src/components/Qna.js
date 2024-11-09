// src/components/QnA.js
import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";

function Qna() {
  const [questions, setQuestions] = useState([
    { question: "질문 1", answer: "답변 1" },
    { question: "질문 2", answer: "답변 2" },
    { question: "질문 3", answer: "답변 3" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAdd = () => {
    if (newQuestion.trim() !== "" && newAnswer.trim() !== "") {
      setQuestions([...questions, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  return (
    <div>
      <h2>Q&A</h2>
      <Accordion defaultActiveKey="0">
        {questions.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <h3 className="mt-4">질문 추가하기</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formQuestion">
          <Form.Label>질문</Form.Label>
          <Form.Control
            type="text"
            placeholder="질문을 입력하세요"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAnswer">
          <Form.Label>답변</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="답변을 입력하세요"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAdd}>
          추가
        </Button>
      </Form>
    </div>
  );
}

export default Qna;
