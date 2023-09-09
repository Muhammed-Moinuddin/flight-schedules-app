import './App.css';
import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


function App() {

  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState('');


  useEffect(() => {
    fetchData();
  }, [finalPoint])

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
    setFinalPoint(endPoint);
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} className='search-bar'>
        <Form.Group className="mb-3">
          <Form.Control className='input-field' type="text" value={endPoint} onChange={e => setEndPoint(e.target.value)} placeholder="Search here.." />
        </Form.Group>
        <Button className='submit-button' type="submit" >
            Submit
          </Button>
      </Form>
      {container.map((item, index) => {
          return(
            <Container className='container'>
               <Card style={{ width: '18rem' }} key={index} className="card">
                <Card.Img variant="top" src={item.i.imageUrl} className='cardImage'/>
                <Card.Body>
                  <Card.Title className="card-title">{item.l}</Card.Title>
                  <Card.Text className="card-text">
                    Stars: {item.s}
                  </Card.Text>
                  <Card.Footer className="text-muted">Year: {item.y}</Card.Footer>
                  <Button className='learn-more-button' href="https://www.imdb.com/find/?q=">Learn More</Button>
                </Card.Body>
              </Card>
            </Container>
          )
      })}
    </div>
  );
}

export default App;
