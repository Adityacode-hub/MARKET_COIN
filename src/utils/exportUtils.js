import { saveAs } from 'file-saver';

// Export data as CSV
export const exportAsCSV = (data, filename = 'export') => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(',')).join('\n');
  const csvContent = `${headers}\n${rows}`;
  
  // Create a blob and save the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}.csv`);
};

// Export data as JSON
export const exportAsJSON = (data, filename = 'export') => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  saveAs(blob, `${filename}.json`);
};
