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

const GeographicalAnalytics = ({ calculatedData }) => {
  useEffect(() => {
    const randomLatLon = () => {
      const lat = 42 + Math.random() * 3; // Latitudes between 42 and 45
      const lon = -90 + Math.random() * 3; // Longitudes between -90 and -87
      return [lon, lat];
    };

    const schoolPoints = calculatedData.map(school => {
      const [lon, lat] = randomLatLon();
      return {
        type: 'Feature',
        properties: {
          name: school['School Name'],
          nonlinear: school['nonlinear'],
          lon,
          lat
        },
        geometry: {
          type: 'Point',
          coordinates: [lon, lat]
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
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          scale: 0.05
        }),
        text: new Text({
          text: `${school.properties.name.split(' ').map(word => word.charAt(0)).join('')}\nNon-linear score: ${school.properties.nonlinear.toFixed(2)}`,
          offsetY: 40,
          font: 'bold 12px Arial, sans-serif',
          fill: new Fill({
            color: '#000'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          }),
          backgroundFill: new Fill({
            color: 'rgba(255, 255, 255, 0.7)'
          }),
          padding: [3, 3, 3, 3]
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
        color: 'rgba(0, 0, 255, 0.5)',
        width: 2
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
        center: fromLonLat([-89.4012, 43.0731]), // Centered on Madison, WI
        zoom: 6
      })
    });

    return () => map.setTarget(null);
  }, [calculatedData]);

  return (
    <div>
      <div id="map" className="map"></div>
    </div>
  );
};

export default GeographicalAnalytics;
