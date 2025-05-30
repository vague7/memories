import React  from 'react';
import { Container} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';


const theme = createTheme();

const App = () => {
  const user= JSON.parse(localStorage.getItem('profile'));
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element ={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home/>} />
            <Route path="/posts/search"  element={<Home/>} />
            <Route path="/posts/:id" element={<PostDetails/>} />
            <Route path="/auth" element={!user ? <Auth/>: <Navigate to="/posts"/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;