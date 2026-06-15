import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admissions from './pages/Admissions';


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Redirect homepage */}
        {/* <Route 
          path="/" 
          element={<Navigate to="/admissions" replace />} 
        /> */}


        {/* Admissions page */}
        <Route 
          path="/" 
          element={<Admissions />} 
        />


      </Routes>

    </BrowserRouter>
  )

}


export default App;