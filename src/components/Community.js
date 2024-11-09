// src/components/Community.js
import React from "react";
import { ListGroup } from "react-bootstrap";

function Community() {
  const posts = [
    { title: "커뮤니티 글 1", content: "커뮤니티 글 1의 내용입니다." },
    { title: "커뮤니티 글 2", content: "커뮤니티 글 2의 내용입니다." },
    { title: "커뮤니티 글 3", content: "커뮤니티 글 3의 내용입니다." },
  ];

  return (
    <div>
      <h2>커뮤니티</h2>
      <ListGroup>
        {posts.map((post, index) => (
          <ListGroup.Item key={index}>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Community;
