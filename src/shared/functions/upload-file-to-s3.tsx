export async function uploadFileToS3(
  url: string,
  fields: Record<string, string>,
  file: File
) {
  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha ao fazer upload do arquivo.');
  }

  return response.url;
}
