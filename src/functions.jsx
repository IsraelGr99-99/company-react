import Swal from "sweetalert2";
import storage from './Storage/storage';

//Creamos funcion exportable para la alerta personalizada
export const show_alerta = (msj, icon) => {
    Swal.fire({
        title: msj,
        icon: icon,
        buttonsStyling: true
    });
}

/**
 * Funcion asincrona sendRequest
 * recibde como parametro
 *  -method
 * -params
 * -url
 * -redir
 * -token
 */
export const sendRequest = async (method, params, url, redir = '', token = true) => {
    //Si existe un token cramos la variable
    if (token) {
        const authToken = storage.get('authToken');
        //Mediante axios le indicamos la cabezara de autentificacion
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    }
    //Declaramos variable res
    let res;
    //Con await hacemos una peticion hacia axios
    await axios({ method: method, url: url, data: params })
        //Si todo marcha bien esperamos una respuesta
        .then(
            response => {
                res = response.data,
                    //Si el metodo es diferente de get mostramos una alerta
                    (method != 'GET') ? show_alerta(response.data.message, 'success') : '',
                    setTimeout(() =>
                        //Si la variable de redir es diferente de vacía y le ponemos 2s de espera
                        (redir !== '') ? window.location.href = redir : '', 2000)
            })
        //Cachamos los errores que se hayan producido
        .catch((errors) => {
            let desc = '';
            res = errors.response.data,
            //Si en cada mapero hay error vamos irlos guardando en la misma varible
            errors.response.data.errors.map((e) => {desc = desc + ' '+e})
        show_alerta(desc, 'error')
    })
    //Retornamos la variable que contiene la respuesta
    return res;
}
//Funcion de confirmacion
export const confirmation = async (name, url, redir) => {
    const alerta = Swal.mixin({ buttonsStyling: true });
    alerta.fire({
        title: 'Are you sure delete ' + name + ' ?',
        icon: 'question',
        //Indicamos que tendra un boton de cancelacion
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Yes, delete.',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel.'
    })
        //Si todo salio bien cachamos el resultado
        .then((result) => {
            //Si el usuario confirmo la eliminacion procedemos a realizar la ejecución
            if (result.isConfirmed) {
                sendRequest('DELETE', {}, url, redir)
            }
        });
}

//Indicamos que la funcion exportable es show_alerta
export default show_alerta;