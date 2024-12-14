'use client';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useFormContext } from 'react-hook-form';
import { MapContainer, Marker, Popup,TileLayer } from 'react-leaflet';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/modules/components/ui/card';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const FormReview: React.FC = () => {
  const { watch } = useFormContext();
  const {
    name,
    description,
    category,
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
      <h2 className="mb-6 text-3xl font-light">Step 5: Review & Confirm</h2>
      <p className="mb-4 text-gray-600">
        Please review all the information below before confirming.
      </p>

      {/* Card de Informações Básicas (Step 1) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-700">Store Name</dt>
              <dd className="text-base text-gray-900">{name || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Category</dt>
              <dd className="text-base text-gray-900">{category || '-'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-700">Description</dt>
              <dd className="text-base text-gray-900">{description || '-'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Card de Informações de Contato (Step 2) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-700">Address</dt>
              <dd className="text-base text-gray-900">{address || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Phone</dt>
              <dd className="text-base text-gray-900">{phone || '-'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-700">Email</dt>
              <dd className="text-base text-gray-900">{email || '-'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Card de Localização (Step 3) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Location</CardTitle>
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
                  <Popup>Your selected location</Popup>
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

      {/* Card de Payment Setup (Step 4) - Placeholder ou Dados Reais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Payment Setup</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Se tiver dados de pagamento, liste aqui. Caso contrário, um placeholder */}
          <p className="text-base text-gray-900">
            Payment details will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
