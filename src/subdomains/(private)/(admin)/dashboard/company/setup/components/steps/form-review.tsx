'use client';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useFormContext } from 'react-hook-form';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/modules/components/ui/card';
import { PageProps } from '@/shared/modules/types/page-props';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const FormReview: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { watch } = useFormContext();
  const {
    name,
    description,
    categories,
    address,
    phone,
    email,
    latitude,
    longitude,
  } = watch();

  const hasLocation = latitude !== 0 && longitude !== 0;
  const center = hasLocation
    ? ([latitude, longitude] as [number, number])
    : [-15.7942, -47.8822];

  return (
    <div className="space-y-8">
      <h2 className="mb-6 text-3xl font-light">{t('steps.5.title')}</h2>
      <p className="mb-4 text-gray-600">{t('steps.5.description')}</p>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('steps.1.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-700">
                {t('form.labels.name')}
              </dt>
              <dd className="text-base text-gray-900">{name || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">
                {t('form.labels.categories')}
              </dt>
              <dd className="text-base text-gray-900">
                {categories && categories.length > 0
                  ? categories.join(', ')
                  : '-'}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-700">
                {t('form.labels.description')}
              </dt>
              <dd className="text-base text-gray-900">{description || '-'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('steps.2.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-700">
                {t('form.labels.address')}
              </dt>
              <dd className="text-base text-gray-900">{address || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">
                {t('form.labels.phone')}
              </dt>
              <dd className="text-base text-gray-900">{phone || '-'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-700">
                {t('form.labels.email')}
              </dt>
              <dd className="text-base text-gray-900">{email || '-'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('steps.3.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasLocation ? (
            <div className="h-64 w-full overflow-hidden rounded-md border">
              <MapContainer
                center={[center[0], center[1]]}
                zoom={14}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                touchZoom={false}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>{t('form.labels.selected-location')}</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <p className="text-base text-gray-900">
              No location selected. Please go back and select a location.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('steps.4.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-900">
            {t('form.status.payment-details')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
