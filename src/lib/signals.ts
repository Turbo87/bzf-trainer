export type Situation = 'flight' | 'ground';
export type Color = 'green' | 'red' | 'white';
export type Pattern = 'steady' | 'blinking';

interface BaseSignal {
	situation: Situation;
	label: string;
	meaning: string;
}

export interface LightSignal extends BaseSignal {
	type: 'light';
	color: Color;
	pattern: Pattern;
}

export interface PyrotechnicSignal extends BaseSignal {
	type: 'pyrotechnic';
	colors: Color[];
}

export type Signal = LightSignal | PyrotechnicSignal;

export const SIGNALS: Signal[] = [
	// Signale an Luftfahrzeuge im Flug
	{
		type: 'light',
		situation: 'flight',
		color: 'green',
		pattern: 'steady',
		label: 'Grünes Dauerlicht',
		meaning: 'Landung frei',
	},
	{
		type: 'light',
		situation: 'flight',
		color: 'green',
		pattern: 'blinking',
		label: 'Grünes Blinklicht',
		meaning: 'Anflug fortsetzen (Rückkehr zur Landung)',
	},
	{
		type: 'light',
		situation: 'flight',
		color: 'red',
		pattern: 'steady',
		label: 'Rotes Dauerlicht',
		meaning: 'Anderes Luftfahrzeug hat Vorrang – Platzrunde fortsetzen',
	},
	{
		type: 'light',
		situation: 'flight',
		color: 'red',
		pattern: 'blinking',
		label: 'Rotes Blinklicht',
		meaning: 'Nicht landen!',
	},
	{
		type: 'light',
		situation: 'flight',
		color: 'white',
		pattern: 'blinking',
		label: 'Weißes Blinklicht',
		meaning: 'Auf diesem Flugplatz landen',
	},
	{
		type: 'pyrotechnic',
		situation: 'flight',
		colors: ['red'],
		label: 'Rote Feuerwerkskörper',
		meaning: 'Ungeachtet aller früheren Anweisungen und Freigaben zur Zeit nicht landen',
	},
	{
		type: 'pyrotechnic',
		situation: 'flight',
		colors: ['red', 'green'],
		label: 'Leuchtgeschosse (rot und grün)',
		meaning: 'Warnung! Einflug in Sperrgebiet oder Gefahrengebiet',
	},

	// Signale an Luftfahrzeuge am Boden
	{
		type: 'light',
		situation: 'ground',
		color: 'green',
		pattern: 'steady',
		label: 'Grünes Dauerlicht',
		meaning: 'Start frei',
	},
	{
		type: 'light',
		situation: 'ground',
		color: 'green',
		pattern: 'blinking',
		label: 'Grünes Blinklicht',
		meaning: 'Rollen frei (Piste überqueren)',
	},
	{
		type: 'light',
		situation: 'ground',
		color: 'red',
		pattern: 'steady',
		label: 'Rotes Dauerlicht',
		meaning: 'Halt',
	},
	{
		type: 'light',
		situation: 'ground',
		color: 'red',
		pattern: 'blinking',
		label: 'Rotes Blinklicht',
		meaning: 'Rollhalt – Piste / Rollweg frei machen',
	},
	{
		type: 'light',
		situation: 'ground',
		color: 'white',
		pattern: 'blinking',
		label: 'Weißes Blinklicht',
		meaning: 'Zum Ausgangspunkt auf dem Flugplatz zurückkehren',
	},
];

export function signalsForSituation(situation: Situation): Signal[] {
	return SIGNALS.filter((s) => s.situation === situation);
}
