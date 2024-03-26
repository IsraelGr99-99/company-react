//Objeto con metodos
export const storage = {
    get(key){
        //Va a checar si existe la palabra clave en el localStorage
        const val = window.localStorage.getItem(key);
        //Si no esta retorna null
        if(!val){
            return null;
        }
        //Si todo sale bien convierte el valor que esta en el localStorage
        return  JSON.parse(val);
    },
    //Método set recibe una clave y un valor
    set(key,val){
        //Asignamos el valor a la clave y el valor lo convetimos a JSON
        window.localStorage.setItem(key,JSON.stringify(val));
    },
    //Método para eliminar la clave
    remove(key){
        window.localStorage.removeItem(key);
    },
    //Método para limpiar el localStorage
    clear(){
        window.localStorage.clear();
    }
    
}
export default storage;