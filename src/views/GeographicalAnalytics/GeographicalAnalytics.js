import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { fromLonLat } from 'ol/proj';
import { Icon, Style, Text, Fill, Stroke } from 'ol/style';
import * as turf from '@turf/turf';
import './GeographicalAnalytics.css';
import school_gps from '../../assets/school_gps.png'
const GeographicalAnalytics = ({ calculatedData, schoolNames }) => {
  useEffect(() => {
    const randomLatLon = () => {
      const lat = 42 + Math.random() * 3; // Latitudes between 42 and 45
      const lon = -90 + Math.random() * 3; // Longitudes between -90 and -87
      return [lon, lat];
    };

    const schoolPoints = calculatedData.filter(row => schoolNames.includes(row['School Name'])).map(school => {
      const [lon, lat] = randomLatLon();
      return {
        type: 'Feature',
        properties: {
          name: school['School Name'],
          nonlinear: school['nonlinear'],
          lon : school['Long'],
          lat : school['Lat']
        },
        geometry: {
          type: 'Point',
          coordinates: [school['Lat'], school['Long']]
        }
      };
    });

    // Calculate the convex hull using turf.js
    const hull = turf.convex({
      type: 'FeatureCollection',
      features: schoolPoints
    });

    const features = schoolPoints.map(school => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([school.properties.lon, school.properties.lat])),
        name: `${school.properties.name} (${school.properties.nonlinear.toFixed(2)})`,
      });
      feature.setStyle(new Style({
        image: new Icon({
          src: school_gps,
          scale: 0.3
        }),
        text: new Text({
          text: `${school.properties.name}`,
          offsetY: 25,
          font: 'bold 12px Arial, sans-serif', // Increased font weight and size
          fill: new Fill({
            color: '#3e4ee1'
          }),
          padding: [3, 40, 3, 40],
          maxWidth: '300px',
          wrap: 'wrap'
        })
      }));
      return feature;
    });

    // Create a feature for the convex hull
    const hullFeature = new Feature({
      geometry: new LineString(hull.geometry.coordinates[0].map(coord => fromLonLat(coord))),
      name: 'Periphery'
    });
    hullFeature.setStyle(new Style({
      stroke: new Stroke({
        color: '#3e4ee1',
        width: 3
      })
    }));

    const vectorSource = new VectorSource({
      features: [...features, hullFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([-88.0103937245483, 42.9768124833109]), // Centered on Madison, WI
        zoom: 12
      })
    });

    return () => map.setTarget(null);
  }, [calculatedData, schoolNames]);

  return (
    <div>
      <div id="map" className="map"></div>
    </div>
  );
};

export default GeographicalAnalytics;
