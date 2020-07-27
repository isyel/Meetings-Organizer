import React from 'react'

function FormError(props) {
    const message = props.message
    return (
        <div className="col-12 alert alert-danger">
            {message}
        </div>
    )
}

export default FormError;