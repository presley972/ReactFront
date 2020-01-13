import React,{ useState } from 'react'
import MapGL, {GeolocateControl, Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN='pk.eyJ1IjoibWF0b2thIiwiYSI6ImNrMGR1b2ExYTA4dzIzZHRpMmF1Z2Z2ZGIifQ.OS0j05uEsw2TikicCyZqHg';

const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
};

const MapContainer = () => {


    const [viewport, setViewPort ] = useState({
        width: "100%",
        height: 700,
        latitude: 0,
        longitude: 0,
        zoom: 2

    });

    const fitnessParks =[{
        id: 1,
        lng: 2.641390,
        lat: 48.835440,
        name: 'FITNESS PARK LOGNES'
    },{
        id: 2,
        lng: 2.609640,
        lat: 48.878430,
        name: 'FITNESS PARK CHELLES - TERRE CIEL'
    },{
        id: 3,
        lng: 2.698530,
        lat: 48.874310,
        name: 'FITNESS PARK LAGNY-SUR-MARNE'
    },{
        id: 4,
        lng: 2.582010,
        lat: 48.870150,
        name: 'FITNESS PARK CHELLES - GÉNÉRAL DE GAULLE'
    },{
        id: 5,
        lng: 2.643190,
        lat: 48.790850,
        name: 'FITNESS PARK ROISSY-EN-BRIE'
    },{
        id: 6,
        lng: 2.542670,
        lat: 48.834990,
        name: 'FITNESS PARK VILLIERS-SUR-MARNE'
    },{
        id: 7,
        lng: 2.513310,
        lat: 48.852330,
        name: 'FITNESS PARK NEUILLY-PLAISANCE'
    },{
        id: 8,
        lng: 2.510800,
        lat: 48.890010,
        name: 'FITNESS PARK VILLEMOMBLE'
    },{
        id: 9,
        lng: 2.328480,
        lat: 48.885520,
        name: 'FITNESS PARK PARIS - PLACE DE CLICHY'
    },];

    const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 90 });

    let loadFitnessParkMarkers = () => {

        return fitnessParks.map(fitness => {
            return (
                <Marker
                    key={fitness.id}
                    latitude={parseFloat(fitness.lat)}
                    longitude={parseFloat(fitness.lng)}
                >
                    <i className="fa fa-map-marker" style={{color: "#FFF"}} aria-hidden="true"> {fitness.name}</i>
                </Marker>
            );
        });
    };

    return (
        <div style={{ margin: '0 auto'}}>
            {/*<h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>GeoLocator: Click To Find Your Location or click <a href="/map/search">here</a> to search for a location</h1>*/}
            <MapGL
                {...viewport}
                mapboxApiAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v8"
                onViewportChange={_onViewportChange}
            >
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />

                {loadFitnessParkMarkers()}
            </MapGL>
        </div>
    )
};

export default MapContainer
