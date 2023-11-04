import React, { useState } from 'react';


function Textbox() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      placeholder="Enter..."
    />
  );
}

export default Textbox;
