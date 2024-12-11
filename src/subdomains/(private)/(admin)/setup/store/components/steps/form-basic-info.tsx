import { PhotoUpload } from '@/shared/modules/components/custom/photo-upload';
import { Input } from '@/shared/modules/components/ui/input';
import { Label } from '@/shared/modules/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/modules/components/ui/select';
import { Textarea } from '@/shared/modules/components/ui/textarea';

type FormBasicInfoProps = {
  storeData: {
    name: string;
    description: string;
    category: string;
  };
  updateStoreData: (
    field: keyof FormBasicInfoProps['storeData'],
    value: string
  ) => void; // Consistência no nome
};

export const FormBasicInfo: React.FC<FormBasicInfoProps> = ({
  storeData,
  updateStoreData,
}) => (
  <div>
    <h2 className="mb-6 text-2xl font-light">Step 1: Basic Information</h2>
    <div className="space-y-4">
      <PhotoUpload onPhotoSelect={() => null} />
      <div>
        <Label htmlFor="name" className="text-gray-700">
          Store Name
        </Label>
        <Input
          id="name"
          value={storeData.name}
          onChange={(e) => updateStoreData('name', e.target.value)}
          placeholder="Enter your store name"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description" className="text-gray-700">
          Description
        </Label>
        <Textarea
          id="description"
          value={storeData.description}
          onChange={(e) => updateStoreData('description', e.target.value)}
          placeholder="Briefly describe your store"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="category" className="text-gray-700">
          Main Category
        </Label>
        <Select onValueChange={(value) => updateStoreData('category', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="home">Home & Decoration</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);
