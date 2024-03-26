import React from 'react'
//useNavigate nos va a permitir cambiar de ruta en nuestra aplicacion 
import { Link, useNavigate } from 'react-router-dom'
import storage from '../Storage/storage';

const Nav = () => {
  //
  const go = useNavigate();
  //Funcion asincrona remueve las varibales de almacenamiento de authToken y authUser
  const logout = async () => {
    storage.remove('authToken');
    storage.remove('authUser');

    //Mandamos la peticion pasando como parametro el token y regresando al inicio
    await axios.get('/api/auth/logout', storage.get('authToken'));
    go('/login');
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-white bg-info'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>COMPANY</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#nav' aria-controls='navbarSupportedContent'>
          <span className='navbar-toggle-icon'></span>
        </button>
      </div>
      {/* Condicion para mostrar el contenido si el usuario esta loggeado o no */}
      {storage.get('authUser') ? (
        <div className='collapse navbar-collapse' id='nav'>
          <ul className='navbar-nav mx-auto mb-2'>
            {/* Nombre del usuario */}
            <li className='nav-item px-lg-5 h4'>
              {storage.get('authUser').name}
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/' className='nav-link'>Departments</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/employees' className='nav-link'>Employees</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/graphic' className='nav-link'>Graphic</Link>
            </li>
          </ul>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='px-lg-5'>
              {/* Cuando le demos click al boton nos mandara al inicio de sesion */}
              <button className='btn btn-danger' onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}


export default Nav