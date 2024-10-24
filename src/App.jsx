import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar'
import ComponentForm from './components/ComponentForm';
import IssueForm from './components/IssueForm';
import RevenueChart from './components/RevenueChart';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* <Route path="/add-vehicle" element={<VehicleForm />} /> */}
          <Route path="/add-component" element={<ComponentForm />} />
          <Route path="/add-issue" element={<IssueForm />} />
          <Route path="/revenue" element={<RevenueChart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
