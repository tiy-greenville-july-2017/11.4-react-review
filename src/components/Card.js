import React from 'react';


function Card(props){
  return (
    <div className="card">
      <CardBody>
        <h4 className="card-title"><span className="lstick"></span>{props.title}</h4>
        {props.children}
      </CardBody>
    </div>
  )
}

function CardBody(props){
  return (
    <div className={props.className + " card-body"}>
      {props.children}
    </div>
  );
}

export {Card as default, CardBody};
