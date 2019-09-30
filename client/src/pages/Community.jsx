import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'

const Community = (props) => {
	const [users, setUsers] = useState('');
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
					<p>{user.login.username}</p>
					<p>{`Age: ${user.dob.age}`}</p>
					<img src={user.picture.medium} alt={user.login.username}/>
					<p>{`Collection: ${Math.floor(Math.random() * 3000)}`}</p>
					<Button className='user-btn' variant="dark">View Profile</Button>
					<Button className='user-btn' variant="dark">Send Message</Button>
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