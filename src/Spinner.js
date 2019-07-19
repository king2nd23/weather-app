import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
const spinner = (props) => {
  return(
    <div>
      <Spinner animation="grow" />
      <hi>Loading</hi>
    </div>

  )
}

export default spinner;
