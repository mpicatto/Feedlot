import React from 'react';
import Login from "../login/Login" 

export  default function Landing() {
return (
  <div>
    <div align="center">
      <h1>Administración Feedlot</h1>
    </div>
    {/* llamo al componente Login importado */}
    <div>
      <Login/>
    </div>
  </div>
)
}