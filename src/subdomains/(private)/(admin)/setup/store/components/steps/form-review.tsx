type FormReviewProps = {
  storeData: {
    name: string;
    description: string;
    category: string;
    address: string;
    phone: string;
    email: string;
  };
};

export const FormReview: React.FC<FormReviewProps> = ({ storeData }) => (
  <div>
    <h2 className="mb-6 text-2xl font-light">Step 4: Review & Confirm</h2>
    <div className="space-y-4">
      <div>
        <p className="text-gray-600">
          <span className="font-medium">Store Name:</span> {storeData.name}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Category:</span> {storeData.category}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Description:</span>{' '}
          {storeData.description}
        </p>
      </div>
      <div>
        <p className="text-gray-600">
          <span className="font-medium">Address:</span> {storeData.address}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Phone:</span> {storeData.phone}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {storeData.email}
        </p>
      </div>
    </div>
  </div>
);
