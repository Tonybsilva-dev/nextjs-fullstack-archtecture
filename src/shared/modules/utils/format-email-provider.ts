export function FormatEmailProvider(company: string) {
  const tenantDomain = company
    .split(' ')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const formattedEmailProvider = `admin@${tenantDomain}.com`;
  return { formattedEmailProvider };
}
