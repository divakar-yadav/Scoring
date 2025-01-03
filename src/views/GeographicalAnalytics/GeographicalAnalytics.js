import React, { useEffect, useState, useRef } from 'react';
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
import school_gps from '../../assets/school_gps.png';
import school_green from '../../assets/school_green.png';
import school_red from '../../assets/school_red.png';
import school_black from '../../assets/school_black.png';
import school_orange from '../../assets/school_orange.png';
import school_blue from '../../assets/school_blue.png';

const GeographicalAnalytics = ({ calculatedData, schoolNames, filters }) => {
  const [filteredData, setFilteredData] = useState(calculatedData);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [mapCenter, setMapCenter] = useState(fromLonLat([-87.93785615489992, 43.05715723734501]));
  const mapRef = useRef(null);

  useEffect(() => {
    let initialSchoolTypes = filters.schoolType;
    if (filters.pipeline) {
      initialSchoolTypes = [...initialSchoolTypes, 'Pipeline Schools'];
    }
    setSelectedTypes(initialSchoolTypes);
    const filtered = calculatedData.filter((school) =>
      initialSchoolTypes.length === 0 ||
      initialSchoolTypes.includes(school['School Type']) ||
      (initialSchoolTypes.includes('Pipeline Schools') && schoolNames.includes(school['School Name']))
    );

    setFilteredData(filtered);
  }, [filters, calculatedData, schoolNames]);

  const getPointer = (score) => {
    if (score < 40) {
      return school_red;
    } else if (score >= 40 && score < 50) {
      return school_orange;
    } else if (score >= 50 && score < 60) {
      return school_black;
    } else if (score >= 60 && score < 70) {
      return school_blue;
    } else if (score >= 70) {
      return school_green;
    }
    return school_black;
  };

  const getTextColor = (score) => {
    if (score < 40) {
      return '#e31c1d';
    } else if (score >= 40 && score < 50) {
      return '#E97451';
    } else if (score >= 50 && score < 60) {
      return '#000';
    } else if (score >= 60 && score < 70) {
      return '#091986';
    } else if (score >= 70) {
      return '#09873e';
    }
    return '#000';
  };

  useEffect(() => {
    const initializeMap = (data) => {
      const schoolPoints = data.map((school) => ({
        type: 'Feature',
        properties: {
          name: school['School Name'],
          nonlinear: school['nonlinear'],
          lon: school['Long'],
          lat: school['Lat'],
          type: school['Type'],
        },
        geometry: {
          type: 'Point',
          coordinates: [school['Lat'], school['Long']],
        },
      }));

      const hull = turf.convex({
        type: 'FeatureCollection',
        features: schoolPoints,
      });

      if (!hull || !hull.geometry) {
        console.error('Convex hull could not be generated. Ensure that the input data is correct and non-empty.');
        return null;
      }

      const features = schoolPoints.map((school) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([school.properties.lon, school.properties.lat])),
          name: `${school.properties.name} (${school.properties.nonlinear.toFixed(2)})`,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              src: getPointer(school.properties.nonlinear.toFixed(2)),
              scale: 0.07,
            }),
            text: new Text({
              text: `${school.properties.name}`,
              offsetY: 25,
              font: 'bold 12px Arial, sans-serif',
              fill: new Fill({
                color: getTextColor(school.properties.nonlinear.toFixed(2)),
              }),
              padding: [3, 40, 3, 40],
              maxWidth: '300px',
              wrap: 'wrap',
            }),
          })
        );
        return feature;
      });

      const hullFeature = new Feature({
        geometry: new LineString(hull.geometry.coordinates[0].map((coord) => fromLonLat(coord))),
        name: 'Periphery',
      });
      hullFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: '#3e4ee1',
            width: 3,
          }),
        })
      );

      const vectorSource = new VectorSource({
        features: [...features, hullFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      if (mapRef.current) {
        const view = mapRef.current.getView();
        view.setCenter(mapCenter);
        const layers = mapRef.current.getLayers().getArray();
        mapRef.current.removeLayer(layers[layers.length - 1]);
        mapRef.current.addLayer(vectorLayer);
      } else {
        const view = new View({
          center: mapCenter,
          zoom: 14, // Fixed zoom level
        });

        const map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ],
          view: view,
        });

        mapRef.current = map;

        view.on('change:center', () => {
          setMapCenter(view.getCenter());
        });
      }
    };

    console.log('Initializing map with filtered data:', filteredData);
    const map = initializeMap(filteredData);

    return () => {
      if (map) {
        map.setTarget(null);
      }
    };
  }, [filteredData, mapCenter]);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredData(calculatedData);
    } else {
      setFilteredData(calculatedData.filter((school) =>
        selectedTypes.includes(school['School Type']) ||
        (selectedTypes.includes('Pipeline Schools') && schoolNames.includes(school['School Name']))
      ));
    }
  }, [selectedTypes, calculatedData, schoolNames]);

  return (
    <div>
      <div id="map" className="map"></div>
    </div>
  );
};

export default GeographicalAnalytics;
