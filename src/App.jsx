import './App.css'
import { Route, Routes} from 'react-router';
import Articles from './components/Articles.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WelcomePage from './components/WelcomePage.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Header />
    <Routes>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/articles" element={<Articles/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
