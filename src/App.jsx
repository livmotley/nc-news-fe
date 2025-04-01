import './App.css'
import { Route, Routes} from 'react-router';
import Articles from './components/Articles.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WelcomePage from './components/WelcomePage.jsx';
import NavBar from './components/NavBar.jsx';
import SingleArticlePage from './components/SingleArticlePage.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Header />
    <Routes>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/articles" element={<Articles/>} />
      <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      <Route path="/articles/:article_id/comments" element={<SingleArticlePage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
