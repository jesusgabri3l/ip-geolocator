import { createRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, MapConsumer } from "react-leaflet";
import "./styles/styles.scss";

import Header from './components/Header';

function App() {
  
  const map = createRef();
  const [currentPosition, setCurrentPosition] = useState([]);
  // -- //
  const onSubmitIPHandler = (coords) => {
    if(map.current) {
      const ZOOM = 15;
      setCurrentPosition(coords);
      map.current.flyTo(coords, ZOOM);
    }
  }
    
  return (
    <div className="main-wrapper">
      <Header onSubmitIPHandler={onSubmitIPHandler} />
      <div className="map" id="map">
        <MapContainer
          center={[10.963889, -74.796387]}
          zoom={2}
          style={{ height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentPosition.length ===  0 ? (
            ""
          ) : (
            <Marker position={currentPosition}>
              <Popup>
                Current IP position
              </Popup>
            </Marker>
          )}
          <MapConsumer>
            {(mapIP) => {
              map.current = mapIP;
              return null;
            }}
          </MapConsumer>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
