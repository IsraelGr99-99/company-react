import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {sendRequest} from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';

const Login = () => {
  //Declaramos las variables
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const go = useNavigate();

  //La documentacion indica que necesitamos mandar una peticion a esta ruta si nos conectaremos a ella, si no es de laravel se puede omitir este paso
  const csrf = async()=>{
    await axios.get('/sanctum/csrf-cookie')
  }
  const login = async(e)=>{
    //Prevenimos que se envie el formulario
    e.preventDefault();
    await csrf();
    const form = {email:email,password:password};
    const res = await sendRequest('POST',form,'api/auth/login','',false);
    if(res.status == true){
      storage.set('authToken',res.token);
      storage.set('authUser',res.data);
      go('/');
    }
  }

  return (
    <div>Login</div>
  )
}

export default Login;