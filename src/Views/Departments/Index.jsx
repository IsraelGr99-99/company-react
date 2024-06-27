import { useEffect, useState } from 'react';
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import { confirmation, sendRequest } from '../../functions';
import DivAdd from '../../Components/DivAdd';
import '../../stylesheets/indexDepartment.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const res = await sendRequest('GET', '', '/api/departments', '');
    setDepartments(res);
    setClassLoad('d-none');
    setClassTable('');
  }

  const deleteDepartment = (id, name) => {
    confirmation(name, (`/api/departments/${id}`), '/');
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
            {departments.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.name}</td>
                <td className='text-center'>
                  <Link to={'/edit/' + row.id} className='btn btn-blue'>
                    <i className='fa-solid fa-edit'></i>
                  </Link>
                </td>
                <td className='text-center'>
                  <button className='btn btn-trash' onClick={() => deleteDepartment(row.id, row.name)}>
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

export default DepartmentList;
