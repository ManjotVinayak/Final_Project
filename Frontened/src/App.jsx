import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Signup from './pages/Signup.jsx';
import MergeActivity from './pages/MergeActivity.jsx';
import MergeRequests from './pages/Mergerequests.jsx';

function App() {
  return (
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/merge-activity" element={<MergeActivity />} />
				<Route path='/merge-requests' element={<MergeRequests />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
