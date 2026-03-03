import { type Signal, SIGNALS, signalsForSituation } from './signals';

export interface Question {
	signal: Signal;
	answers: string[];
}

export function generateQuestion(): Question {
	let signal = pickRandom(SIGNALS);

	let others = signalsForSituation(signal.situation).filter((s) => s !== signal);
	let wrongAnswers = shuffle(others).slice(0, 3).map((s) => s.meaning);
	let answers = shuffle([signal.meaning, ...wrongAnswers]);

	return { signal, answers };
}

function pickRandom<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

function shuffle<T>(array: T[]): T[] {
	let result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
