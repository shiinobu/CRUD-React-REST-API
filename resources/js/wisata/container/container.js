import React from 'react';

function Container({title, validate, optional, children}) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        {validate}
                        <h5 className="card-header d-flex justify-content-between align-items-center">
                            <strong>{title}</strong>
                            {optional}
                        </h5>
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container;
