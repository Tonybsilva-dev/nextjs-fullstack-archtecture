import { Input } from '@/shared/modules/components/ui/input';
import { Label } from '@/shared/modules/components/ui/label';

type FormContactInfoProps = {
  storeData: {
    address: string;
    phone: string;
    email: string;
  };
  updateStoreData: (
    field: keyof FormContactInfoProps['storeData'],
    value: string
  ) => void; // Consistência no nome
};

export const FormContactInfo: React.FC<FormContactInfoProps> = ({
  storeData,
  updateStoreData,
}) => (
  <div>
    <h2 className="mb-6 text-2xl font-light">Step 2: Contact Information</h2>
    <div className="space-y-4">
      <div>
        <Label htmlFor="address" className="text-gray-700">
          Address
        </Label>
        <Input
          id="address"
          value={storeData.address}
          onChange={(e) => updateStoreData('address', e.target.value)}
          placeholder="Store address"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-gray-700">
          Phone
        </Label>
        <Input
          id="phone"
          value={storeData.phone}
          onChange={(e) => updateStoreData('phone', e.target.value)}
          placeholder="Contact phone"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={storeData.email}
          onChange={(e) => updateStoreData('email', e.target.value)}
          placeholder="Contact email"
          className="mt-1"
        />
      </div>
    </div>
  </div>
);
