import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'files';
    const limitParam = searchParams.get('limit') || '100';
    const limit = limitParam ? parseInt(limitParam, 10) : 100;

    if (isNaN(limit) || limit <= 0) {
      return NextResponse.json(
        { error: '[limit] search-params must be have a positive number.' },
        { status: 400 }
      );
    }

    const listParams = {
      Bucket: BUCKET,
      Prefix: `${folder}/`,
      MaxKeys: limit,
    };

    const command = new ListObjectsV2Command(listParams);
    const response = await s3.send(command);

    if (!response.Contents) {
      return NextResponse.json({ files: [] });
    }

    const files = response.Contents.map((item) => {
      const fileUrl = `https://${BUCKET}.s3.${AWS_REGION}.amazonaws.com/${item.Key}`;
      return {
        key: item.Key,
        lastModified: item.LastModified,
        size: item.Size,
        url: fileUrl,
      };
    });

    return NextResponse.json({ files });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('Error listing files from AWS:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
