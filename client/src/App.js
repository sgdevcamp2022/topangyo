import './styles/_reset.scss';
import Router from './Router';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Router/>
    </div>
  );
}

export default App;
