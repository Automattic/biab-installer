import { STATUS_NOTHING } from 'state/drive/type';

export function getInitialDrive() {
	return {
		showing: false,
		selected: false,
		available: [ {
			device: '/boot/thing',
			description: 'A drive',
			mountpoints: [ { path: '/boot' } ],
			protected: false,   // true to set as write-protected
			system: false,
			size: 123456,
		} ],
		burnStatus: STATUS_NOTHING,
		errorReason: false,
		progress: {
			percentage: 0,
			eta: 0,
			speed: 0,
		},
	};
}
