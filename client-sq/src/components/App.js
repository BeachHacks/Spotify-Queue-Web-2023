import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return <Dashboard />
}

export default App;
