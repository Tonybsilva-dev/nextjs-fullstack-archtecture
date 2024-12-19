import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

import { AppError } from '@/shared/modules/utils/errors';

const BUCKET = process.env.AWS_BUCKET_NAME as string;
const AWS_REGION = process.env.AWS_REGION as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'files';
    const customName = (formData.get('customName') as string) || uuidv4();

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }

    const fileName = slugify(customName, { lower: true, trim: true });
    const extension = file.type.split('/')[1];
    const key = `${folder}/${fileName}.${extension}`;

    const uploadParams = {
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
      ContentLength: file.size,
      acl: 'public-read',
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('Error uploading file to AWS:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Todo - Create a GET method to fetch files
