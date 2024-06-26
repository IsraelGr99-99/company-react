import React from 'react'

const DivAdd = ({ children }) => {
  return (
    <div className='row '>
      <div className="col-md-4 offset-md-4">
        <div className="d-grid mx-auto bg-dark cont-add-btn mt-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DivAdd;
