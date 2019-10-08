import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const MessageModal = (props) => {
	const [showMessageModal, setshowMessageModal] = useState(false);

	const handleShowMessage = () => {
		setshowMessageModal(true);
	};

	const handleCloseMessage = () => {
		setshowMessageModal(false);
	};

	return (
		<div>
			<Button onClick={handleShowMessage} className='user-btn' variant="dark">Send Message</Button>
				<Modal show={showMessageModal} onHide={handleCloseMessage}>
        	<Modal.Header closeButton>
        		<Modal.Title>Message {props.user.name.first}!</Modal.Title>
        	</Modal.Header>
        	<Modal.Body>
						<Form.Group controlId="exampleForm.ControlTextarea1">
    					<Form.Label>Message</Form.Label>
    					<Form.Control as="textarea" rows="3" />
  					</Form.Group>
					</Modal.Body>
        	<Modal.Footer>
        		<Button variant="secondary" onClick={handleCloseMessage}>
        		  Close
        		</Button>
        		<Button variant="primary">
        		  Send
        		</Button>
        	</Modal.Footer>
      	</Modal>
		</div>
	)
}

export default MessageModal