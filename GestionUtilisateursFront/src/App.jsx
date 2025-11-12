import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import SignUpPage from '../Pages/SignUpPage';
import LoginPage from '../Pages/LoginPage';
import UserPage from '../Pages/UserPage';
import AdminPage from '../Pages/AdminPage';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}


export default App;
