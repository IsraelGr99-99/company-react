import {useEffect, useState}  from 'react';
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import {confirmation, sendRequest} from '../../functions';
import DivAdd from '../../Components/DivAdd';
import '../../stylesheets/indexDepartment.css'

const Edit = () => {

  const [departments, setDepartments] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setclassTable] = useState('d-none');

  useEffect( ()=>{
    getDepartments();
  },[]);

  const getDepartments = async() => {
    //Hacemos peticion a la funcion sed en GET y guaramos los resultados en la variable res
    const res = await sendRequest('GET','','/api/departments','');
    //Almacenamos las resultados para que se altualicen en departamentos
    setDepartments(res);
    //Cambiamos la clase del gif para que ya no se muestre que este cargando
    setClassLoad('d-none');
    setclassTable('');
  }

  //Funcion para eliminar el departamento pasandole como parametros el ID y el nombre
  const deleteDepartment = (id,name)=> {
    //Mandamos a traer la funcion de confirmacion
    confirmation(name,(`/api/departments/${id}`),'/');
  }


  return (
    <div className='container-fluid department'>
      <DivAdd>
        <Link to='create' className='btn cont-add-btn '>
          <i className='fa-solid fa-circle-plus'></i> Add
        </Link>
      </DivAdd>
      <DivTable col='8' off='2' classLoad={classLoad} classTable={classTable}>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>DEPARTMENT</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {departments.map( (row,i)=>(
              <tr key={row.id}>
                <td>{(i+1)}</td>
                <td>{row.name}</td>
                {/* Cuando hacemos clic nos manda a la pagina de editar */}
                <td className='text-center'>
                  <Link to={'/edit/'+ row.id} className='btn btn-blue'>
                    <i className='fa-solid fa-edit'></i>
                  </Link>
                </td>
                <td className='text-center'>
                  <button className='btn btn-trash' onClick={()=>deleteDepartment(row.id,row.name)}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  )
}

export default Edit;