import React from 'react'

const DivAdd = ({ children }) => {
  return (
    <div className='row mt-3 bg-danger'>
      <div className="col-md-4 offset-md-4 bg-warning">
        <div className="d-grid mx-auto ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DivAdd;
