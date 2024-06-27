import React, { useEffect, useRef, useState } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormDep = ({ id, title }) => {
  const [name, setName] = useState('');
  const NameInput = useRef();
  let method = 'POST';
  let url = '/api/departments';
  let redirect = '';

  useEffect(() => {
    NameInput.current.focus();
    getDepartment();
  }, [id]);

  const getDepartment = async () => {
    if (id) {
      const res = await sendRequest('GET', '', `${url}/${id}`);
      setName(res.data.name);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (id) {
      method = 'PUT';
      url = `/api/departments/${id}`;
      redirect = '/';
    }
    const res = await sendRequest(method, { name: name }, url, redirect);
    if (method === 'POST' && res.status === true) {
      setName('');
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
                  <button className='btn cont-add-btn'>
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
