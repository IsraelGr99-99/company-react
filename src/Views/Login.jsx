import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendRequest } from "../functions";
import DivInput from "../Components/DivInput";
import storage from "../Storage/storage";
import "../stylesheets/login.css";

const Login = () => {
  //Declaramos las variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const go = useNavigate();

  //La documentacion indica que necesitamos mandar una peticion a esta ruta si nos conectaremos a ella, si no es de laravel se puede omitir este paso
  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };
  const login = async (e) => {
    //Prevenimos que se envie el formulario
    e.preventDefault();
    await csrf();
    const form = { email: email, password: password };
    const res = await sendRequest("POST", form, "api/auth/login", "", false);
    if (res.status == true) {
      storage.set("authToken", res.token);
      storage.set("authUser", res.data);
      go("/");
    }
  };

  return (
    <div className="container-fluid login">
      <div className="col-md-6 cont-login">
        <div className="data-login">
          <h1 className="">LOGIN</h1>
          <div className="card-body">
            {/* Cuando se mande este formulario mandara la funcion login */}
            <form onSubmit={login}>
              <DivInput
                type="email"
                icon="fa-at"
                value={email}
                className="form-control login-input"
                placeholder="Email"
                required="required"
                handleChange={(e) => setEmail(e.target.value)}
              />
              <DivInput
                type="password"
                icon="fa-key"
                value={password}
                className="form-control login-input"
                placeholder="Password"
                required="required"
                handleChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-grid col-10 mx-auto cont-btn-login">
                <button className="btn btn-login text-white">
                  <i class="fa-solid fa-right-to-bracket"></i> Login
                </button>
              </div>
            </form>
            {/* Link que nos lleva a la seccion de registro */}
            <div className="cont-btn-register">
              <Link to="/register" className="text-decoration-none cont-btn-register">
                <i className="fa-solid fa-user-plus mt-4"></i> Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
