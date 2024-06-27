import { useParams } from 'react-router-dom';
import FormDep from '../../Components/FormDep';
import '../../stylesheets/edit.css';

const EditDepartment = () => {
  const { id } = useParams();

  return (
    <div className='container-fluid edit'>
      <FormDep id={id} title='Edit Department' />
    </div>
  );
}

export default EditDepartment;
