import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Card, Button, Accordion } from 'react-bootstrap'


const Collection = (props) => {
	const [collection, setCollection] = useState([]);

	useEffect(() => {
		console.log(props.user._id)
			axios.get(`/collection/${props.user._id}`).then( res => {
				setCollection(res.data)
			})
	}, [props.user]);

	let showCollection = collection.map((item, i) => {
		return (
			<>
				<Accordion key={i}>
					<Card className='release-card' style={{ width: '18rem' }}>
  					<Card.Img variant="top" src={item.image} alt={item.title} />
  					<Card.Body>
  					  <Card.Title>{item.title}</Card.Title>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
        				More Information
      				</Accordion.Toggle>    
							<Accordion.Collapse eventKey="0">
  					  	<Card.Text>
									<span>{item.year}</span> <br/>
									<span>{item.label}</span> <br/>
									<span>{item.genre}</span> <br/>
  					  	</Card.Text>
   					 	</Accordion.Collapse> 
  					</Card.Body>
  					  <Button variant="dark" className='delete-btn'>Remove From Collection</Button>
					</Card>
				</Accordion>
			</>
		)
	})

	return (
		<div className='main'>
			<h1>{`${props.user.name}'s Collection:`}</h1>
			<div className='show-results'>
				{showCollection}
			</div>
		</div>
	)
}

export default Collection