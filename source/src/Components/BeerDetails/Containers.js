import React from "react";
import { IconButton } from "@material-ui/core";

const Containers = ({bottle, can}) => {

	const styling = {
		position: 'absolute',
		top: '320px',
		right: '20px',
		diplay: 'flex',
		alignItems: 'center'
	}

	const imageStyle = {
		width: '30px'
	}

	return (
		<div style={styling}>
			{bottle &&
				<IconButton>
					<img alt='bottle icon' style={imageStyle} src={`${process.env.PUBLIC_URL}/icons/bottle.png`} />
				</IconButton>	
			}
			{can && 
				<IconButton>
					<img alt='can icon' style={imageStyle} src={`${process.env.PUBLIC_URL}/icons/can.png`} />
				</IconButton>
			}
		</div>
	)
}

export default Containers