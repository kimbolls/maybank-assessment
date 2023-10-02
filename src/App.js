
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListingPage from './ProductListingPage';


function App() {
  
  return (
    <Router>
      <Routes>

        {/* <Route path="/addproduct" Component={ProductPage} /> */}
        
        <Route path="/productlisting" Component={ProductListingPage} />
        <Route path="/" Component={ProductListingPage} />

      </Routes>
    </Router>
  );
}

export default App;
