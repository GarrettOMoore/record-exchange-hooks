import React, {useState, useEffect} from 'react'

const Explore = (props) => {
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
		showUsers = users.map((user) => {
			return (
				<div className='user-box'>
					<p>{user.login.username}</p>
					<p>{`Age: ${user.dob.age}`}</p>
					<img src={user.picture.medium} />
					<p>{`Collection: ${Math.floor(Math.random() * 3000)}`}</p>
				</div>
			)
		})
	}

	return (
		<div className='main'>
			<h1> {`Hey, ${props.user.name}!`}</h1>
			<div className='show-users'>
				{showUsers}
			</div>
		</div>
	)
}

export default Explore