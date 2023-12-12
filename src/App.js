import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import PostDetail from './components/post/PostDetail';

function App() {
  console.log('App');
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post/:postId" element={<PostDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
