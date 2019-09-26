import React, { useState } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
// import { Button } from 'react-bootstrap/Button'


const Explore = () => {
	const [query, setQuery] = useState('');
	const [message, setMessage] = useState('')
	const [apiData, setApiData] = useState({});

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	const handleQuerySubmit = (e) => {
    e.preventDefault();
    axios.post('/explore/', {
			query: query
    }).then( res => {
        if (res.data.type === 'error') {
          setMessage(res.data.message);
        } else {
					setApiData(res.data);
        }
    })
	};

	let discogsData;
	
	if (apiData.data) {
		discogsData = apiData.data.results.map((item, i) => {
			return (
				<Card key={i} className='release-card' style={{ width: '18rem' }}>
  				<Card.Img variant="top" src={item.cover_image} alt={item.title} />
  				<Card.Body>
  				  <Card.Title>{item.title}</Card.Title>
  				  <Card.Text>
							<span>{item.year}</span> <br/>
							<span>{item.label[0]}</span> <br/>
							<span>{item.genre[0]}</span> <br/>
  				  </Card.Text>
  				</Card.Body>
  				  <Button variant="dark" className='add-collection-btn'>Add To Collection</Button>
						<Button variant="dark" className='add-collection-btn'>Add To Want List</Button>
				</Card>
			)
		})
	} else {
		discogsData = message;
	}

	

	return (
		<div className="main">
			<h3>Search By Artist or Album Title:</h3>
			<div className='query-input'>
				<input onChange={handleInputChange}type="text" placeholder="Search"></input>
				<button onClick={handleQuerySubmit}>Go</button>
			</div>
			<div className='show-results'>
				{discogsData}
			</div>
		</div>
	)
}

export default Explore