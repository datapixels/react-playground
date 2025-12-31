export async function getCollectionData(
	remote: string,
	action: string,
	parameters?: Record<string, any>
): Promise<any[]> {
	await new Promise((resolve) => setTimeout(resolve, 100));
	if (remote === 'WorkOrder' && action === 'GetWorkOrderCollection') {
		const workOrders = [
			{ id: 'WO-1001', title: 'Inspect ASSET-A', description: 'Routine inspection', assetId: 'ASSET-A', status: 'open', priority: 'high', assignedTo: 'tech.jones' },
			{ id: 'WO-1002', title: 'Repair ASSET-A', description: 'Repair required', assetId: 'ASSET-A', status: 'in_progress', priority: 'medium', assignedTo: 'tech.smith' },
			{ id: 'WO-2001', title: 'Audit ASSET-B', description: 'Audit scheduled', assetId: 'ASSET-B', status: 'completed', priority: 'low', assignedTo: 'tech.lee' },
			{ id: 'WO-2002', title: 'Replace ASSET-B', description: 'Replacement needed', assetId: 'ASSET-B', status: 'open', priority: 'high', assignedTo: 'tech.patel' },
			{ id: 'WO-2003', title: 'Inspect ASSET-B', description: 'Routine inspection', assetId: 'ASSET-B', status: 'open', priority: 'medium', assignedTo: 'tech.jones' },
			{ id: 'WO-2004', title: 'Repair ASSET-B', description: 'Repair required', assetId: 'ASSET-B', status: 'in_progress', priority: 'low', assignedTo: 'tech.smith' },
			{ id: 'WO-3001', title: 'Clean ASSET-C', description: 'Cleaning task', assetId: 'ASSET-C', status: 'closed', priority: 'medium', assignedTo: 'tech.jones' },
			{ id: 'WO-3002', title: 'Test ASSET-C', description: 'Testing required', assetId: 'ASSET-C', status: 'in_progress', priority: 'low', assignedTo: 'tech.smith' },
			{ id: 'WO-4001', title: 'Calibrate ASSET-D', description: 'Calibration needed', assetId: 'ASSET-D', status: 'completed', priority: 'high', assignedTo: 'tech.lee' },
			{ id: 'WO-4002', title: 'Audit ASSET-D', description: 'Audit scheduled', assetId: 'ASSET-D', status: 'open', priority: 'medium', assignedTo: 'tech.patel' },
		];
		if (parameters?.assetId) {
			return workOrders.filter(w => w.assetId === parameters.assetId);
		}
		return workOrders;
	}
	return [];
}