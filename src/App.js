
import './App.css';
import HeaderComponent from './components/common/HeaderComponent';
import ContentComponent from './components/common/ContentComponent';
import FooterComponent from './components/common/FooterComponent';
import {Button} from 'react-bootstrap'

function App() {
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  return (
    <div className="App">
      <HeaderComponent ></HeaderComponent>
      <ContentComponent></ContentComponent>
      <FooterComponent></FooterComponent>
      <Button className='scrollUp ' variant="dark" size="md" onClick={scrollToTop}>&uarr;</Button>
    </div>
  );
}


export default App;
