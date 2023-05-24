// Componente da aplicação

// Manipula a URL atual no browser
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      {/* Plota a barra de navegação */}
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          {/* Plota a página Home caso a URL termine em / */}
          <Route exact path='/' element={<Home />}></Route>
          {/* Plota a página Projetos caso a URL termine em /projects */}
          <Route path= '/projects' element={<Projects />}></Route>
          {/* Plota a página Empresa caso a URL termine em /company */}
          <Route path='/company' element={<Company />}></Route>
          {/* Plota a página Contatos caso a URL termine em /contact */}
          <Route path='/contact' element={<Contact />}></Route>
          {/* Plota a página de Novo Projeto caso a URL termine em /newproject */}
          <Route path='/newproject' element={<NewProject />}></Route>
          {/* Plota a página do projeto em questão */}
          <Route path='/project/:id' element={<Project />}></Route>
        </Routes>
      </Container>
      {/* Plota o rodapé */}
      <Footer />
    </Router>
  );
}

export default App;
