// Do NOT modify this file.
export function checkCoreModule(parentModule: any, moduleName: string): void {
	if (parentModule) {
		throw new Error('Core Module is already imported in App Module.');
	}
}
