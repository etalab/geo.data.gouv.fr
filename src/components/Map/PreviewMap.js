import React, { Component } from 'react'
import { L } from 'leaflet'

const MAP = {
  latitude: 46.921982,
  longitude: 2.978952,
  zoom: 5,
  maxZoom: 18,
  zoomIn: 12,
  osmUrl: 'https://tilecache.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
  osmAttribution: 'Map data &copy; 2012 OpenStreetMap contributors',
  height: '548px',
}

class PreviewMap extends Component {
  componentWillMount() {
    const options = {
        center: new L.LatLng(MAP.latitude, MAP.longitude),
        zoom: MAP.zoom,
      };

      const osm = new L.TileLayer(MAP.osmUrl, {
            maxZoom: MAP.maxZoom,
            attribution: MAP.osmAttribution
        });

    const mapLayer = new L.TileLayer(MAP.osmUrl);
    this.state({map: new L.Map('map', options).addLayer(mapLayer)})
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default PreviewMap
