import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

const MAP = {
  latitude: 47,
  longitude: 1,
  zoom: 5.5,
  osmUrl: 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  osmAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}

const styles = {
  map: {
    width: '55%',
    height: '560px',
  },
}

class PreviewMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: MAP.latitude,
      lng: MAP.longitude,
      zoom: MAP.zoom,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map style={styles.map} center={position} zoom={this.state.zoom}>
        <TileLayer attribution={MAP.attribution} url={MAP.osmUrl} />
        <Marker position={position} />
      </Map>
    );
  }
}
export default PreviewMap
