import React, { useState } from 'react';

const HardnessPrediction = (props) => {
  const [input, setInput] = useState({ Stemp: '', Stime: '', Welpower: '', Welspeed: '', Hardness: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { Stemp, Stime, Welpower, Welspeed } = input;
    const API_URL = 'http://127.0.0.1:5000/predict';
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Stemp: parseFloat(Stemp),
        Stime: parseFloat(Stime),
        Welpower: parseFloat(Welpower),
        Welspeed: parseFloat(Welspeed)
      })
    })
      .then(response => response.json())
      .then(data => {
        const HardnessPrediction = data.Hardness;
        setInput(prevInput => ({ ...prevInput, Hardness: HardnessPrediction }));
       
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>HardnessPrediction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stemp: </label>
          <input type="number" name="Stemp" value={input.Stemp} onChange={handleChange} />
        </div>
        <div>
          <label>Stime: </label>
          <input type="number" name="Stime" value={input.Stime} onChange={handleChange} />
        </div>
        <div>
          <label>Welpower: </label>
          <input type="number" name="Welpower" value={input.Welpower} onChange={handleChange} />
        </div>
        <div>
          <label>Welspeed: </label>
          <input type="number" name="Welspeed" value={input.Welspeed} onChange={handleChange} />
        </div>
        <button type="submit">Predict Hardness</button>
      </form>
      <div>
        <p>Predicted Hardness: {input.Hardness}</p>
      </div>
    </div>
  );
};

export default HardnessPrediction;
