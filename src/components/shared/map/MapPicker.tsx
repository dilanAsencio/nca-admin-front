"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { searchLocation, GeocodeResult } from "@/utils/oms-geocode";
import ButtonComponent from "../button/ButtonComponent";
import InputComponent from "../input/InputComponent";
import { useForm } from "react-hook-form";

const markerIcon = L.icon({
  iconUrl: "/assets/icon/marker-pick-school.svg",
//   iconSize: [150, 150],
});

interface MapPickerProps {
  value?: { lat: number; lon: number };
  onChange: (coords: { lat: number; lon: number }) => void;
}

export default function MapPicker({ value, onChange }: MapPickerProps) {
  const { register } = useForm();
  const [position, setPosition] = useState(
    value || { lat: 4.570868, lon: -74.297333 }
  );
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [search, setSearch] = useState("");
  const [defaultLocation, setDefaultLocation] = useState({
    lat: 4.570868,
    lon: -74.297333,
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const coords = { lat: e.latlng.lat, lon: e.latlng.lng };
        setPosition(coords);
        onChange(coords);
      },
    });
    return (
      <Marker
        position={[position.lat, position.lon]}
        icon={markerIcon}
        draggable
      />
    );
  };

  const handleSearch = async () => {
    const data = await searchLocation(search);
    setResults(data);
  };

  const selectLocation = (item: GeocodeResult) => {
    const coords = {
      lat: item.lat === 0 ? defaultLocation.lat : item.lat,
      lon: item.lon === 0 ? defaultLocation.lon : item.lon,
    };
    setPosition(coords);
    onChange(coords);
    setResults([]);
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg">
      {/* Map */}
      <MapContainer
        className="rounded-lg"
        center={[
          position.lat === 0 ? defaultLocation.lat : position.lat,
          position.lon === 0 ? defaultLocation.lon : position.lon,
        ]}
        zoom={40}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      {/* Search Input */}
      <div className="absolute bottom-4 left-8 flex flex-col bg-white rounded-lg shadow-lg p-[1rem] z-[800] max-w-sm md:max-w-lg">
        <div className="flex items-end gap-2">
          <div className="basis-3/4">
            <span className="m-0 text-sm font-normal text-gray-700">
              Ingresar dirección
            </span>
            <InputComponent
              isInputSearch={true}
              name="search"
              placeholder="Buscar..."
              className="primary"
              register={register("search", {
                onChange(event) {
                  const value = event.target.value;
                  setSearch(value);
                },
                value: search,
              })}
            />
          </div>
          <div className="basis-1/4">
            <ButtonComponent
              className="primary w-full"
              icon={{ path: "/assets/icon/target-01.svg", alt: "search" }}
              onClick={() => handleSearch()}
            />
          </div>
        </div>
        {results.length > 0 && (
          <ul className="absolute bg-white border top-[80%] w-full z-10 max-h-40 overflow-auto">
            {results.map((item, idx) => (
              <li
                key={idx}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => selectLocation(item)}
              >
                {item.displayName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
