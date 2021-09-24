import './App.css';
import Home from './pages/home';
import ExportContent from './services/api'

function App() {
  console.log(ExportContent)
  return (
    <>
      <Home />
    </>
  );
}

export default App;
