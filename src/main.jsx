import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//Indicamos que usaremos fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
//Importamos AXIOS
import axios from 'axios'

//Declamos axios de manera global
window.axios =axios

//Definimos la ruta base
//Definimos la ruta de la API
window.axios.defaults.baseURL = 'https://company.yajala.com/'
//Encabezados
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.headers.common['X-Requested'] = 'application/json'
//Credenciales
window.axios.defaults.withCredentials = true


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
