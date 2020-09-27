import React from "react";

import "./styles.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <img src="/logo192.png" alt="logo" />
        <nav>Barra de navegación</nav>
        <form>Formulario de busqueda</form>
      </div>
    </>
  );
}
