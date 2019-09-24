import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {
	return (
		<div>
			<nav>
        <Link className='nav-text'to='/'>About</Link> | {' '}
        <Link className='nav-text'to='/login'>Login</Link> | {' '}
        <Link className='nav-text'to='/signup'>Sign Up</Link> | {' '}
        <Link className='nav-text'to='/login'>My Collection</Link> | {' '}
        <Link className='nav-text'to='/signup'>Explore</Link> | {' '}
				<Link onClick={props.logout} className='nav-text'to='/signout'>Sign Out</Link>
      </nav>
		</div>
	)
}

export default Nav