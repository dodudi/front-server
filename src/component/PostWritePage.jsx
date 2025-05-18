import React, { useState } from "react";
import { Container, TextField, Typography, Button, Box } from "@mui/material";
import MarkdownEditor from "../component/MarkdownEditer";

function PostWritePage() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content: markdown,
        author: "admin", // 로그인 유저 이름 등으로 변경 가능
      }),
    });

    if (res.ok) {
      alert("글이 성공적으로 등록되었습니다.");
      setTitle("");
      setMarkdown("");
    } else {
      alert("등록 실패");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        글 작성
      </Typography>

      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Box mt={2}>
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
      </Box>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default PostWritePage;
