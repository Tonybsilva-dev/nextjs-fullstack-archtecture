import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

interface PresignedPost {
  url: string;
  fields: Record<string, string>;
  fileUrl: string;
}

type fetchData = {
  file: File;
  folder?: string;
  fileName: string;
};

export async function fetchPresignedUrl({
  file,
  folder = 'files',
  fileName,
}: fetchData): Promise<PresignedPost> {
  const filename =
    slugify(fileName, { lower: true, trim: true }) + '-' + uuidv4();
  const extension = file.type.split('/')[1];
  const key = `${folder}/${filename}.${extension}`;

  const response = await fetch('/api/uploads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: key,
      contentType: file.type,
    }),
  });

  if (!response.ok) {
    console.log('REPONSE /API/UPLOADS', response);
    throw new Error('Não foi possível obter a URL presigned.');
  }

  const presignedData = await response.json();
  const fields = presignedData.message.fields;
  const formData = new FormData();

  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });

  formData.append('file', file);

  const uploadResponse = await fetch(presignedData.url, {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Falha ao fazer upload do arquivo.');
  }

  return {
    ...presignedData,
    fileUrl: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`,
  };
}
