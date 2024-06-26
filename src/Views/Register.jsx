import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendRequest } from "../functions";
import DivInput from "../Components/DivInput";
import axios from "axios";
import "../stylesheets/register.css";

const Register = () => {
  //Declaramos las variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const go = useNavigate();

  //La documentacion indica que necesitamos mandar una peticion a esta ruta si nos conectaremos a ella, si no es de laravel se puede omitir este paso
  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };
  const register = async (e) => {
    //Prevenimos que se envie el formulario
    e.preventDefault();
    await csrf();
    const form = { name: name, email: email, password: password };
    const res = await sendRequest("POST", form, "api/auth/register", "", false);
    if (res.status == true) {
      go("/login");
    }
  };

  return (
    <div className="container-fluid register">
      <div className="col-md-6 cont-register">
        <div className="data-register">
          <h1>Registrate</h1>
          <div className="card-bory">
            <form onSubmit={register}>
              <DivInput
                type="text"
                icon="fa-user"
                value={name}
                className="form-control"
                placeholder="Name"
                required="required"
                handleChange={(e) => setName(e.target.value)}
              />
              <DivInput
                type="email"
                icon="fa-at"
                value={email}
                className="form-control"
                placeholder="Email"
                required="required"
                handleChange={(e) => setEmail(e.target.value)}
              />
              <DivInput
                type="password"
                icon="fa-key"
                value={password}
                className="form-control"
                placeholder="Password"
                required="required"
                handleChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-grid col-10 mx-auto cont-btn-login">
                <button className="btn btn-success">
                  <i className="fa-solid fa-door-open"></i> Register
                </button>
              </div>
            </form>
            <div className="cont-btn-register mt-4">
              <Link
                to="/login"
                className="text-decoration-none cont-btn-register"
              >
                <i class="fa-solid fa-arrow-right-to-bracket"></i> Iniciar
                Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
