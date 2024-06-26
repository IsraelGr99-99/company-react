import React from 'react'

const DivTable = ({ children, col, off, classLoad, classTable }) => {
  return (
    <div className='row mt-3'>
      <div className={`col-md-${col} offset-md-${off}`}>
        <div className={`card border text-center ${classLoad}`}>
          <div className="card-body">
            {/* Imagen que se muestra mientras carga la informacion */}
            <img src='/loading.gif' alt="loading" className='img-fluid' />
          </div>
        </div>
        <div className={`table-responsive ${classTable}`}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default DivTable
