import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function Textbox({text,setText}) {


  return (
    <Form>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} placeholder ="Enter.." onChange={e => setText(e.target.value)} value={text} />
      </Form.Group>
    </Form>
  );
}

export default Textbox;