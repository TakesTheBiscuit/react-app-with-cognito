import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9ycGV0ZXJzc2FrZTEiLCJhIjoiY2t4dGRocnJ3MmlqdjJwa29hc2x0M2tpaSJ9.tjh2waXueu1P5Et9iOsMwQ';

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

        
        // Add a route to the map

        // San Francisco
        const origin = [-122.414, 37.776];

        // Washington DC
        const destination = [-77.032, 38.913];

        // A simple line from origin to destination.
        const route = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [origin, destination]
                    }
                }
            ]
        };

        // this will be challenging when trying to add data to the map from external
        // will need to monitor in the state 'map loaded'
        map.on('load', function() {
            map.addSource('route', {
                'type': 'geojson',
                'data': route
            });

            map.addLayer({
                'id': 'route',
                'source': 'route',
                'type': 'line',
                'paint': {
                    'line-width': 2,
                    'line-color': '#007cbf'
                }
            });
        });

    }

    


    // need to do this:
    // https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-route/



    
    render() {
        return (
            <div>
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }

}
export default MyMap;