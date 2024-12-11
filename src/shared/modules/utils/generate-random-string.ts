export function generateRandomString({
  length = 6,
  numeric = false,
  alphanumeric = false,
  includeSpecial = false,
  customCharset = '',
}: {
  length?: number;
  numeric?: boolean;
  alphanumeric?: boolean;
  includeSpecial?: boolean;
  customCharset?: string;
}): string {
  const numbers = '0123456789';
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?~';

  let charset = '';

  if (numeric) charset += numbers;
  if (alphanumeric) charset += letters + numbers;
  if (includeSpecial) charset += specialChars;
  if (customCharset) charset += customCharset;

  if (!charset) {
    throw new Error(
      'No valid character set selected. Please enable at least one option or provide a custom charset.'
    );
  }

  // Gera a string aleatória
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}
