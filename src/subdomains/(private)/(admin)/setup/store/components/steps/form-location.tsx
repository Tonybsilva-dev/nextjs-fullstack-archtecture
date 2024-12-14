'use client';

import L from 'leaflet';
import { useFormContext } from 'react-hook-form';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/modules/components/ui/form';

// Ícone padrão do Leaflet ajuste caso necessário
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationSelector() {
  const { setValue, watch } = useFormContext();
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setValue('latitude', lat, { shouldValidate: true });
      setValue('longitude', lng, { shouldValidate: true });
    },
  });

  return (
    <>
      {latitude !== 0 && longitude !== 0 && (
        <Marker position={[latitude, longitude]}>
          <Popup>Your selected location</Popup>
        </Marker>
      )}
    </>
  );
}

export const FormLocation: React.FC = () => {
  const { control, watch } = useFormContext();
  const latitude = watch('latitude') || 0;
  const longitude = watch('longitude') || 0;

  const center =
    latitude !== 0 && longitude !== 0
      ? ([latitude, longitude] as [number, number])
      : [-15.7942, -47.8822];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-light">Step 3: Location Setup</h2>
      <p className="mb-4 text-gray-600">
        Click on the map to set your exact store location.
      </p>
      <div className="space-y-4">
        {/* Campos latitude e longitude escondidos, mas validados */}
        <FormField
          control={control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                {/* Campo oculto, apenas para manter validação e estado */}
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="longitude"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="h-96 w-full">
          {/* Container do mapa */}
          <MapContainer
            center={[center[0], center[1]]}
            zoom={14}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
