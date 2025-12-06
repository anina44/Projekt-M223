import './App.css';
import Home from './pages/Home';
import Hinzufügen from './pages/Hinzufügen';
import Reiseziel from './pages/Reiseziel';
import Layout from './pages/Layout';
import WeltkartePage from './pages/WeltkartePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
       <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hinzufuegen" element={<Hinzufügen />} />
        <Route path="reiseziel" element={<Reiseziel />} />
        <Route path="weltkartepage" element={<WeltkartePage /> } />
      </Route>
    </Routes>
  );
}

export default App;

