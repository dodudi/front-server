import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_API_URL, USER_API_URL } from "../config.js";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mui/material";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(USER_API_URL, {
        username,
        password,
      });

      alert("회원가입 성공!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "회원가입 실패");
      } else {
        setErrorMsg("서버 연결에 실패했습니다.");
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 5, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          회원가입
        </Typography>
        <Box component="form" onSubmit={handleSignup}>
          <TextField
            label="이메일"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              회원가입
            </Button>
            <Button variant="text" fullWidth onClick={() => navigate("/")}>
              로그인으로 돌아가기
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupPage;
