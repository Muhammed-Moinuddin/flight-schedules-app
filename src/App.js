import './App.css';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);

  useEffect(() => {
    fetchData();
  }, [endPoint])

  const fetchData = async() => {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoint}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bb2751c7bdmshce56e8660c931f4p19b039jsn2ffe4b7ac46a',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
};
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setContainer(result.d);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" value={endPoint} onChange={e => setEndPoint(e.target.value)} placeholder="Search here.." />
        </Form.Group>
        <Button variant="primary" type="submit" >
            Submit
          </Button>
      </Form>
      {container.map((item) => {
          return(
            <p>{item.l}</p>
          )
      })}
    </div>
  );
}

export default App;
