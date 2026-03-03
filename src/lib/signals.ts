export type Situation = 'flight' | 'ground';
export type Color = 'green' | 'red' | 'white';
export type Pattern = 'steady' | 'blinking';

export interface Signal {
	situation: Situation;
	color: Color;
	pattern: Pattern;
	label: string;
	meaning: string;
}

export const SIGNALS: Signal[] = [
	// Signale an Luftfahrzeuge im Flug
	{
		situation: 'flight',
		color: 'green',
		pattern: 'steady',
		label: 'Grünes Dauerlicht',
		meaning: 'Landung frei',
	},
	{
		situation: 'flight',
		color: 'green',
		pattern: 'blinking',
		label: 'Grünes Blinklicht',
		meaning: 'Anflug fortsetzen (Rückkehr zur Landung)',
	},
	{
		situation: 'flight',
		color: 'red',
		pattern: 'steady',
		label: 'Rotes Dauerlicht',
		meaning: 'Anderes Luftfahrzeug hat Vorrang – Platzrunde fortsetzen',
	},
	{
		situation: 'flight',
		color: 'red',
		pattern: 'blinking',
		label: 'Rotes Blinklicht',
		meaning: 'Nicht landen!',
	},
	{
		situation: 'flight',
		color: 'white',
		pattern: 'blinking',
		label: 'Weißes Blinklicht',
		meaning: 'Auf diesem Flugplatz landen',
	},

	// Signale an Luftfahrzeuge am Boden
	{
		situation: 'ground',
		color: 'green',
		pattern: 'steady',
		label: 'Grünes Dauerlicht',
		meaning: 'Start frei',
	},
	{
		situation: 'ground',
		color: 'green',
		pattern: 'blinking',
		label: 'Grünes Blinklicht',
		meaning: 'Rollen frei (Piste überqueren)',
	},
	{
		situation: 'ground',
		color: 'red',
		pattern: 'steady',
		label: 'Rotes Dauerlicht',
		meaning: 'Halt',
	},
	{
		situation: 'ground',
		color: 'red',
		pattern: 'blinking',
		label: 'Rotes Blinklicht',
		meaning: 'Rollhalt – Piste / Rollweg frei machen',
	},
	{
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
