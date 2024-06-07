import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import AboutScreen from "./screens/AboutScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProductScreen />} />
          <Route path="/about" element={<AboutScreen />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
