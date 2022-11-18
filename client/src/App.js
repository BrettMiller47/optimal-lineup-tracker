import './App.css';
import Home from './pages/Home';
import LeagueSummary from './pages/LeagueSummary';
import ThemeProvider from './utils/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <Home />
      <LeagueSummary />
    </ThemeProvider>
  );
}

export default App;
