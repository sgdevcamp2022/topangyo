import './styles/_reset.scss';
import Routes from './Routes';
import Navbar from './components/Navbar';

const App = () => {

  return (
    <div className="App">

      <Navbar/>
      <Routes/>
    </div>
  );
}

export default App;
