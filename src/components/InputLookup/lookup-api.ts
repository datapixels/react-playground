// Fake fetch function - replace with actual API call later
export async function fetchLookupData(remote: string, action: string): Promise<any[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock data - you'll replace this with actual fetch
  return [
    { id: '1', code: 'ASSET-001', description: 'Main Building', status: 'Active' },
    { id: '2', code: 'ASSET-002', description: 'Storage Unit A', status: 'Active' },
    { id: '3', code: 'ASSET-003', description: 'Vehicle Fleet', status: 'Inactive' },
    { id: '4', code: 'ASSET-004', description: 'Equipment Depot', status: 'Active' },
    { id: '5', code: 'ASSET-005', description: 'Office Complex', status: 'Active' },
  ];
}
