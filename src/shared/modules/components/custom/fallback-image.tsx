import { ImageOffIcon, LucideIcon } from 'lucide-react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { FC,useState } from 'react';

interface FallbackImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
  fallback?: LucideIcon;
}

export const FallbackImage: FC<FallbackImageProps> = ({
  src,
  fallback: FallbackIcon = ImageOffIcon,
  alt,
  ...props
}) => {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return isError ? (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <FallbackIcon className="h-8 w-8 text-gray-400" />
    </div>
  ) : (
    <Image src={src} alt={alt} onError={handleError} {...props} />
  );
};
