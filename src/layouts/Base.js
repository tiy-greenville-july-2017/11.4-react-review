import React from 'react';

function BaseLayout(props){
  return (
    <div className="container">
      <div style={{'height': '75px', backgroundColor: 'black', color: '#FFF'}}>
        <h3>Welcome to Message Central!</h3>
      </div>
      {props.children}
    </div>
  )
}

export default BaseLayout;
