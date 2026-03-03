import type { Situation } from './signals';

export type TimeOfDay = 'day' | 'night';

export interface Confirmation {
	situation: Situation;
	time: TimeOfDay;
	question: string;
	correctAnswer: string;
	wrongAnswers: string[];
}

export const CONFIRMATIONS: Confirmation[] = [
	{
		situation: 'ground',
		time: 'day',
		question: 'Wie bestätigt der Pilot ein Lichtsignal am Boden bei Tag?',
		correctAnswer: 'Bewegen der Querruder oder des Seitenruders',
		wrongAnswers: [
			'Wechselweise Betätigung der Querruder',
			'Zweimaliges Ein- und Ausschalten der Landescheinwerfer oder der Positionslichter',
			'Bewegen des Höhenruders',
		],
	},
	{
		situation: 'ground',
		time: 'night',
		question: 'Wie bestätigt der Pilot ein Lichtsignal am Boden bei Nacht?',
		correctAnswer:
			'Zweimaliges Ein- und Ausschalten der Landescheinwerfer oder der Positionslichter',
		wrongAnswers: [
			'Bewegen der Querruder oder des Seitenruders',
			'Einmaliges Ein- und Ausschalten der Landescheinwerfer oder der Positionslichter',
			'Dreimaliges Ein- und Ausschalten der Positionslichter',
		],
	},
	{
		situation: 'flight',
		time: 'day',
		question: 'Wie bestätigt der Pilot ein Lichtsignal im Flug bei Tag?',
		correctAnswer: 'Wechselweise Betätigung der Querruder',
		wrongAnswers: [
			'Bewegen der Querruder oder des Seitenruders',
			'Zweimaliges Ein- und Ausschalten der Landescheinwerfer oder der Positionslichter',
			'Wechselweise Betätigung des Seitenruders',
		],
	},
	{
		situation: 'flight',
		time: 'night',
		question: 'Wie bestätigt der Pilot ein Lichtsignal im Flug bei Nacht?',
		correctAnswer:
			'Zweimaliges Ein- und Ausschalten der Landescheinwerfer oder der Positionslichter',
		wrongAnswers: [
			'Wechselweise Betätigung der Querruder',
			'Einmaliges Ein- und Ausschalten der Landescheinwerfer',
			'Einschalten der Positionslichter für mindestens 10 Sekunden',
		],
	},
];
