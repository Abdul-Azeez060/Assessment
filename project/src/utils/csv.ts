export function generateCSV(data: Record<string, any>[]): string {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => obj[header]));
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      // Handle cells that contain commas, quotes, or newlines
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(','))
  ].join('\n');
  
  return csvContent;
}