import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import React from 'react';

const GoogleMaps = ({ google }) => {
	const containerStyle = {
		position: 'relative',
		width: '80%',
		height: '60%'
	};

	return (
		<div className="google-maps">
			<Map
				google={google}
				zoom={14}
				initialCenter={{
					lat: 37.9838,
					lng: 23.7275
				}}
				style={containerStyle}
				className={'map'}
			>
				<Marker
					onClick={''}
					name={'Athens'}
					title={'Athens'}
					position={{
						lat: 37.9838,
						lng: 23.7275
					}}
				/>

				<InfoWindow
        >
					<div>
						<h1>Hello from Athens</h1>
					</div>
				</InfoWindow>
			</Map>
		</div>
	);
};

export default GoogleApiWrapper({
	apiKey: ('AIzaSyAxK5rucpPQHLLycXbxB3yNSD1Yzty9y2A')
})(GoogleMaps);
