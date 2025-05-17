import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
const drawerWidth = 240;

function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            대시보드
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {["홈", "프로필", "설정"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Typography variant="h4" gutterBottom>
          <Link
            href="https://192.168.0.2/uploads/blog/a"
            target="_blank"
            rel="noopener"
          >
            여기를 클릭하세요
          </Link>
        </Typography>
        <Typography>이곳에 콘텐츠를 추가하세요.</Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;
