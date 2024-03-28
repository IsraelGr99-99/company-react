import { useParams }  from 'react-router-dom'
import FormDep from '../../Components/FormDep';

const Edit = () => {

  const {id} = useParams();

  return (
    <div className='container-fluid'>
      <FormDep id={id} title='Edit Department'></FormDep>
    </div>
  )
}

export default Edit;