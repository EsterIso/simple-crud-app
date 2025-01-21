import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage.jsx';
import Task from './pages/Task';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/task" 
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;