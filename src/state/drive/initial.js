import { STATUS_NOTHING } from 'state/drive/type';

export function getInitialDrive() {
	return {
		showing: false,
		selected: false,
		available: [],
		burnStatus: STATUS_NOTHING,
		errorReason: false,
		progress: {
			percentage: 0,
			eta: 0,
			speed: 0,
		},
	};
}
