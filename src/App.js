import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import UserHome from './components/User/UserHome';
import Cities from "./components/Admin/Cities";
import Zones from "./components/Admin/Zones";
import Specialities from "./components/Admin/Specialities";
import Restaurants from "./components/Admin/Restaurants";
import AdminHome from "./components/Admin/AdminHome";
function App() {
  return (

    <div class="container-fuid" className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/user-page" element={<UserHome />} />
        <Route path="/admin-page" element={<AdminHome />} />
        <Route path="/admin-page/villes" element={<Cities />} />
        <Route path="/admin-page/zones" element={<Zones />} />
        <Route path="/admin-page/specialities" element={<Specialities />} />
        <Route path="/admin-page/restaurants" element={<Restaurants />} />


      </Routes>
    </div>
  );
}

export default App;
