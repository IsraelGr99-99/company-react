import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../Storage/storage'


export const ProtectedRoutes = ({ children }) => {
    //Declaramos variable que almacenara al usuario
    const authUser = storage.get('authUser');
    
    //Si no hay un usuario logeado retornamos a la pagina de login
    if(!authUser){
        return <Navigate to='/login' />
    }
    //Retornamos Outlet
    return <Outlet />
}

export default ProtectedRoutes