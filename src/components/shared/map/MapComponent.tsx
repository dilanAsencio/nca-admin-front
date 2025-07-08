"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import ButtonComponent from "../button/ButtonComponent";

interface MapComponentProps {
  position?: [number, number]; // [lat, lng]
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  position = [4.60971, -74.08175], // Bogotá por defecto
  zoom = 14,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Aquí puedes implementar tu lógica para buscar una ubicación.
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {/* Mapa */}
      <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      </MapContainer>

      {/* Card flotante de búsqueda */}
      <div className="absolute bottom-4 left-8 flex flex-col bg-white rounded-lg shadow-lg p-[1rem] z-[800] max-w-sm md:max-w-lg">
        <span className="m-0 text-sm font-normal text-gray-700">Ingresar dirección</span>
        <div className="flex items-center gap-2">
          <div className="basis-3/4">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Escribe una ubicación..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="basis-1/4">
            <ButtonComponent
                className="primary w-full"
                icon={{path: "/assets/icon/target-01.svg", alt: "search"}}
                onClick={handleSearch}  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
