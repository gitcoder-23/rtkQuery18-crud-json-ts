import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import MainHome from './pages/MainHome';
import AddEditUser from './pages/AddEditUser';
import UserInfo from './pages/UserInfo';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/add" element={<AddEditUser />} />
        <Route path="/update/:id" element={<AddEditUser />} />
        <Route path="/view/:id" element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
