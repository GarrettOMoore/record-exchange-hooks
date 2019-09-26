import React from 'react'

const Collection = (props) => {
	return (
		<div className='main'>
			<h1>{`${props.user.name}'s Collection:`}</h1>
		</div>
	)
}

export default Collection