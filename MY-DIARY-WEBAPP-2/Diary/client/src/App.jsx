import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AddEntry from './pages/AddEntry'
import MyDiary from './pages/MyDiary'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/add-entry" element={
          <PrivateRoute>
            <AddEntry />
          </PrivateRoute>
        } />
        <Route path="/my-diary" element={
          <PrivateRoute>
            <MyDiary />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App