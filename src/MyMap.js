import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk......goes here';

class MyMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 12.550343,
            lat: 55.665957,
            zoom: 2
        };
        this.mapContainer = React.createRef();
    }


    getLocations() {
        return [
            {
                lng: 12.554729,
                lat: 55.70651, 
            },
            {
                lng: 12.65147,
                lat:  55.608166,
            },
            {
                lng: 2.42222,
                lat: 48.856613
            }
        ];
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        const locations = this.getLocations();

        locations.forEach(location => {
            new mapboxgl.Marker()
                .setLngLat([location.lng, location.lat])
                .addTo(map);
        });


    }

    render() {
        return (
            <div>
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }

}
export default MyMap;