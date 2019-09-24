import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {
	let user = props.user;
	let navShow;

	if(user.name) {
		navShow = (
			<nav>
				<Link className='nav-text'to='/'>About</Link> | {' '}
        <Link className='nav-text'to='/collection'>My Collection</Link> | {' '}
        <Link className='nav-text'to='/explore'>Explore</Link> | {' '}
				<Link onClick={props.logout} className='nav-text'to='/signout'>Sign Out</Link>
			</nav>
		);
	} else {
		navShow =(
			<nav>
				<Link className='nav-text'to='/'>About</Link> | {' '}
        <Link className='nav-text'to='/login'>Login</Link> | {' '}
        <Link className='nav-text'to='/signup'>Sign Up</Link> | {' '}
			</nav>
		)
	}
	return (
		<div>
			{navShow}
		</div>
	)
}

export default Nav