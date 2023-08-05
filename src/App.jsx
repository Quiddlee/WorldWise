import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Homepage from './pages/Homepage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './pages/AppLayout.jsx';
import Login from './pages/Login.jsx';
import CityList from './components/CityList.jsx';

const API_BASE_URL = 'http://localhost:8000/';
const API_CITIES_ENDPOINT = `${API_BASE_URL}cities`;

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(cities);
  console.log(isLoading);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(API_CITIES_ENDPOINT);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchCities();
  }, [setIsLoading, setCities]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
