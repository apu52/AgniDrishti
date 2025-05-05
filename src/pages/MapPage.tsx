// src/pages/MapPage.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group'; // Import for animations

// Fix for default marker icons in React-Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Mock fire risk data
const mockFireRisks = [
  { id: 1, lat: 22.5581, lng: 88.3961, risk: 'High', description: 'Industrial area with frequent electrical fires' },
  
];

// Component to handle map view changes
function MapViewUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);
  return null;
}

export default function MapPage() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5726, 88.3639]); // Kolkata
  const [zoomLevel, setZoomLevel] = useState<number>(12);
  const [searchInput, setSearchInput] = useState<string>("");

  // GPS location
  const handleGPSLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setZoomLevel(14);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Failed to get your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Manual search
  const handleSearch = async () => {
    if (searchInput.trim() === "") return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setZoomLevel(14);
      } else {
        alert("Location not found. Please try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to search location.");
    }
  };

  return (
    <div className="map-page" style={{ height: '100vh', width: '100%', position: 'relative' }}>
      
      {/* Google Maps-like Search Bar */}
      <div className="search-bar-container" style={{
        position: 'absolute',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'white',
        borderRadius: '40px',
        padding: '8px 20px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.3s ease',
        width: 'calc(100% - 40px)',
        maxWidth: '500px',
      }}>
        <input
          type="text"
          placeholder="Search location..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: '30px',
            border: '1px solid #ddd',
            fontSize: '16px',
            color: 'black',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)'}
          onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '12px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          🔍
        </button>
      </div>

      {/* GPS Floating Button */}
      <button
        onClick={handleGPSLocate}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: '#28a745',
          border: 'none',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          color: 'white',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Use My Location"
      >
        📍
      </button>

      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Fire risk markers */}
        {mockFireRisks.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup>
              <div>
                <h3>Fire Risk: {location.risk}</h3>
                <p>{location.description}</p>
                <button onClick={() => alert(`Reporting fire at ${location.lat}, ${location.lng}`)}>
                  Report Incident
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapViewUpdater center={mapCenter} zoom={zoomLevel} />
      </MapContainer>
    </div>
  );
}
