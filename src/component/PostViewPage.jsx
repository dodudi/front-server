import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

function PostViewPage() {
  const { id } = useParams(); // /posts/:id 에서 id 추출
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("글을 불러오는 데 실패했습니다.");

        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return null;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        {post.title}
      </Typography>

      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        작성자: {post.author} | 작성일: {post.createdAt}
      </Typography>

      <Box mt={4}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Box>
    </Container>
  );
}

export default PostViewPage;
