import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function Textbox() {


  return (
    <Form>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} placeholder ="Enter.." />
      </Form.Group>
    </Form>
  );
}

export default Textbox;