import './App.css';
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

  const [endPoint, setEndPoint] = useState('');

  useEffect(() => {
    async function fetchData(){
      const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr';
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
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
      fetchData();
    }, [])


  return (
    <div className="App">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="text" value={endPoint} onChange={e => setEndPoint(e.target.value)} placeholder="Search here.." />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
    </div>
  );
}

export default App;
