import React, { useEffect, useState } from 'react';
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
import './MultiYearGeographicalAnalytics.css';
import school_gps from '../../assets/school_gps.png';
import school_green from '../../assets/school_green.png';
import school_red from '../../assets/school_red.png';
import school_black from '../../assets/school_black.png';
import school_pink from '../../assets/school_pink.png';
import school_blue from '../../assets/school_blue.png';

const MultiYearGeographicalAnalytics = ({ calculatedData, schoolNames }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentYear, setCurrentYear] = useState('2022-23');

  const schoolTypes = [
    'Elementary School',
    'High School',
    'Elementary/Secondary School',
    'Middle School',
    'Pipeline Schools',
  ];

  const handleTypeChange = (type) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((t) => t !== type)
        : [...prevSelected, type]
    );
  };

  const getPointer = (score) => {
    if (score < 40) {
      return school_red;
    } else if (score >= 40 && score < 50) {
      return school_pink;
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
      return '#9A0BD2';
    } else if (score >= 50 && score < 60) {
      return '#000';
    } else if (score >= 60 && score < 70) {
      return '#091986';
    } else if (score >= 70) {
      return '#09873e';
    }
    return '#000';
  };

  const filterDataByYear = (data, year) => {
    return data.map(innerArray => innerArray.filter(school => school['School Year'] === year)).flat();
  };

  const getUniqueYears = (data) => {
    const yearsSet = new Set();
    data.forEach(innerArray => {
      innerArray.forEach(school => {
        yearsSet.add(school['School Year']);
      });
    });
    return Array.from(yearsSet);
  };

  const uniqueYears = getUniqueYears(calculatedData);

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

      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([-87.93785615489992, 43.05715723734501]), // Centered on Madison, WI
          zoom: 14,
        }),
      });

      return map;
    };

    const filteredDataByYear = filterDataByYear(calculatedData, currentYear);
    let finalFilteredData = filteredDataByYear;

    if (selectedTypes.length > 0) {
      finalFilteredData = filteredDataByYear.filter(
        (school) =>
          selectedTypes.includes(school['School Type']) ||
          (selectedTypes.includes('Pipeline Schools') && schoolNames.includes(school['School Name']))
      );
    }

    setFilteredData(finalFilteredData);
    const map = initializeMap(finalFilteredData);

    return () => {
      if (map) {
        map.setTarget(null);
      }
    };
  }, [currentYear, selectedTypes, calculatedData]);

  return (
    <div>
      <div className='eligibility-calculator-year-filter'>
      <div className="school-count">
        Number of schools: {filteredData.length}
      </div>
      <div className='year-filter-wrapper'>
          {uniqueYears.map((item) => (
              <div
                key={item}
                onClick={() => setCurrentYear(item)}
                className='eligibility-calculator-year-filter-year'
                style={currentYear === item ? { backgroundColor: '#3e4ee1', color: '#fff' } : null}
              >
                {item}
              </div>
            ))}  
      </div>
  
      </div>
      <div className="filter-container">
        {schoolTypes.map((type) => (
          <div key={type} className="filter-item">
            <input type="checkbox" id={type} value={type} onChange={() => handleTypeChange(type)} />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>

      <div id="map" className="map"></div>
    </div>
  );
};

export default MultiYearGeographicalAnalytics;
