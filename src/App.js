import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Product from "./scenes/Product";





const App=()=>{

  return(
    <div className="app">

   <BrowserRouter basename="Arslan-traders">

      <Routes>
        <Route path="/"  element={Product}/>
      </Routes>
   
   
   </BrowserRouter>
    </div>
  )
      
}



export default App;