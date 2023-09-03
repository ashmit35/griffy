import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './components/Authentication';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Authentication />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
