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

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(LOGIN_API_URL, {
        username,
        password,
      });

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      alert("로그인 성공!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "로그인 실패");
      } else {
        setErrorMsg("서버 연결에 실패했습니다.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 5, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          로그인
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              로그인
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/signup")}
            >
              회원가입
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
