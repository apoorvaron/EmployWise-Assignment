import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users" element={
          <PrivateRoute>
            <UsersList />
          </PrivateRoute>
        } />
        <Route path="/edit/:id" element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;