import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./sections";
import Nav from "./components/Nav";
import ChatButton from "./components/ChatButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Home from "./Home";


// Le agregré rutas para el admin
// Y poder separar la logica de la app ^^

// Credenciales para el admin -> admin@admin.com | admin


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>

  </Router>
)

export default App;
