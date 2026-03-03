import { type Signal, SIGNALS, signalsForSituation } from './signals';

export interface SignalToMeaning {
	mode: 'signal-to-meaning';
	signal: Signal;
	answers: string[];
}

export interface MeaningToSignal {
	mode: 'meaning-to-signal';
	signal: Signal;
	answers: Signal[];
}

export type Question = SignalToMeaning | MeaningToSignal;

export function generateQuestion(): Question {
	let signal = pickRandom(SIGNALS);
	let others = signalsForSituation(signal.situation).filter((s) => s !== signal);

	if (Math.random() < 0.5) {
		let wrongAnswers = shuffle(others).slice(0, 3).map((s) => s.meaning);
		return {
			mode: 'signal-to-meaning',
			signal,
			answers: shuffle([signal.meaning, ...wrongAnswers]),
		};
	} else {
		let wrongSignals = shuffle(others).slice(0, 3);
		return {
			mode: 'meaning-to-signal',
			signal,
			answers: shuffle([signal, ...wrongSignals]),
		};
	}
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
