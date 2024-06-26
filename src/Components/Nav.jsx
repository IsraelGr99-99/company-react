import React from "react";
import "../stylesheets/nav.css";
//useNavigate nos va a permitir cambiar de ruta en nuestra aplicacion
import { Link, useNavigate } from "react-router-dom";
import storage from "../Storage/storage";

const Nav = () => {
  //
  const go = useNavigate();

  //Funcion asincrona remueve las varibales de almacenamiento de authToken y authUser
  const logout = async () => {
    storage.remove("authToken");
    storage.remove("authUser");
    //Mandamos la peticion pasando como parametro el token y regresando al inicio
    await axios.get("/api/auth/logout", storage.get("authToken"));
    go("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-white">
      {/* Condicion para mostrar el contenido si el usuario esta loggeado o no */}
      <div className="container-fluid">
        <div>
          <a className="navbar-brand text-white">COMPANY LOGO</a>
          <i class="fa fa-image"></i>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      {storage.get("authUser") ? (
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav mx-auto mb-2">
            <li className="nav-item px-lg-5">
              <Link to="/" className="nav-link">
                Departments
              </Link>
            </li>
            <li className="nav-item px-lg-5">
              <Link to="/employees" className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item px-lg-5">
              <Link to="/graphic" className="nav-link">
                Graphic
              </Link>
            </li>
          </ul>
          <div class="dropdown">
            <button
              class="btn btn-secondary "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>{storage.get("authUser").name}</li>
              <li><hr class="dropdown-divider bg-white"></hr></li>
              <li>
                <button className="btn btn-out" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Nav;
