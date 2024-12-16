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
import { PageProps } from '@/shared/modules/types/page-props';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const FormLocation: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { control, watch } = useFormContext();
  const latitude = watch('latitude') || 0;
  const longitude = watch('longitude') || 0;

  const center =
    latitude !== 0 && longitude !== 0
      ? ([latitude, longitude] as [number, number])
      : [-15.7942, -47.8822];

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
            <Popup>{t('form.labels.selectedLocation')}</Popup>
          </Marker>
        )}
      </>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-light">{t('steps.3.title')}</h2>
      <p className="mb-4 text-gray-600">{t('steps.3.description')}</p>
      <div className="space-y-4">
        <FormField
          control={control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>{t('form.labels.latitude')}</FormLabel>
              <FormControl>
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
              <FormLabel>{t('form.labels.longitude')}</FormLabel>
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="h-96 w-full">
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
