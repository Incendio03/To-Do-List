import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './components/authentication/Login';
import { SignupPage } from './components/authentication/Signup';
import { HomePage } from './components/dashboard/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/dashboard" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
