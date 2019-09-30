import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const Community = (props) => {
	const [users, setUsers] = useState('');
	const [showModal, setShowModal] = useState(false);

	const handleShow = () => {
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	let showUsers;

	useEffect(() =>  {
		fetch(`https://randomuser.me/api/?results=400`)
		.then((res) => {
			return res.json();
		}).then((users) => {
				setUsers(users.results);
			});
	}, [])

	if (users) {
		showUsers = users.map((user, i) => {
			return (
				<div className='user-box' key={i}>
					<h2>{user.name.first} {user.name.last}</h2>
					<h3>{`Collection: ${Math.floor(Math.random() * 3000)}`}</h3>
					<h5>{user.location.city}, {user.location.state}</h5>
					<h5>{user.location.country}</h5>
					<img className='user-pic' src={user.picture.medium} alt={user.login.username}/>
					<Button className='user-btn' variant="dark">View Profile</Button>
					<Button onClick={handleShow} className='user-btn' variant="dark">Send Message</Button>
					<Modal show={showModal} onHide={handleClose}>
        		<Modal.Header closeButton>
          		<Modal.Title>Message {user.name.first}!</Modal.Title>
        		</Modal.Header>
        		<Modal.Body>
							<Form.Group controlId="exampleForm.ControlTextarea1">
    						<Form.Label>Message</Form.Label>
    						<Form.Control as="textarea" rows="3" />
  						</Form.Group>
						</Modal.Body>
        		<Modal.Footer>
          		<Button variant="secondary" onClick={handleClose}>
          		  Close
          		</Button>
          		<Button variant="primary" onClick={handleClose}>
          		  Send
          		</Button>
        </Modal.Footer>
      </Modal>
				</div>
			)
		})
	}

	return (
		<div className='main'>
			<h1> {`Hey, ${props.user.name}!`}</h1>
			<h3>Check out the Record Exchange User Community</h3>
			<div className='show-users'>
				{showUsers}
			</div>
		</div>
	)
}

export default Community