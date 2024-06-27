import React, { useEffect, useRef, useState } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormDep = ({ id, title }) => {
  const [name, setName] = useState('');
  const NameInput = useRef();

  useEffect(() => {
    if (id) {
      getDepartment();
    }
    NameInput.current.focus();
  }, [id]);

  const getDepartment = async () => {
    try {
      const res = await sendRequest('GET', '', `/api/departments/${id}`);
      setName(res.data.name);
    } catch (error) {
      console.error('Error fetching department:', error);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    let method = id ? 'PUT' : 'POST';
    let url = id ? `/api/departments/${id}` : '/api/departments';
    let redirect = id ? '/' : '';

    try {
      const res = await sendRequest(method, { name: name }, url, redirect);
      if (res.status === true) {
        setName('');
      }
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  return (
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <div className="card border border-info">
            <div className="card-header">
              {title}
            </div>
            <div className="card-body">
              <form onSubmit={save}>
                <DivInput
                  type='text'
                  icon='fa-building'
                  value={name}
                  className='form-control'
                  placeholder='Name'
                  required='required'
                  ref={NameInput}
                  handleChange={(e) => setName(e.target.value)}
                />
                <div className="d-grid col-10 mx-auto">
                  <button className='btn cont-add-btn' type="submit">
                    <i className='fa-solid fa-save'></i> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDep;
