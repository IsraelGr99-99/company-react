import React, {forwardRef,useEffect, useRef} from "react";

//Envio de referencias
export default forwardRef(({ options=[], icon='user', name, id, value, className, required, isFocused, handleChange},ref) => {

    const input = ref ? ref : useRef();

    useEffect(()=>{
        //Si el foco es true se ejecutan las siguientes lineas de codigo
        if(isFocused){
            //Hacemos que se active el foto del elemento
            input.current.focus();
        }
    },[]);

    return(
        <div className="input-group mb-3">
            <span className="input-group-text">
                <i className={'fa-solid '+icon}></i>
            </span>
            <select  name={name} id={id} value={value} className={className} ref={input} required={required} onChange={(e) => handleChange(e)}>
              { options.map( (op) =>(
                <option value={op.id} key={op.id}>{op.name}</option>
              ))};
            </select>
        </div>
    )
});