import { describe, expect, it } from 'vitest';
import {
	generateQuestion,
	type ConfirmationQuestion,
	type MeaningToSignal,
	type SignalToMeaning,
} from './quiz';
import { CONFIRMATIONS } from './confirmations';
import { signalsForSituation } from './signals';

function generateMany(n: number) {
	return Array.from({ length: n }, () => generateQuestion());
}

function ofMode<T>(questions: ReturnType<typeof generateQuestion>[], mode: string): T[] {
	return questions.filter((q) => q.mode === mode) as T[];
}

describe('generateQuestion', () => {
	it('always returns 4 answers', () => {
		for (let q of generateMany(100)) {
			expect(q.answers).toHaveLength(4);
		}
	});

	it('picks signals from both situations over many runs', () => {
		let signalQuestions = generateMany(200).filter((q) => q.mode !== 'confirmation');
		let situations = new Set(signalQuestions.map((q) => q.signal.situation));
		expect(situations.has('flight')).toBe(true);
		expect(situations.has('ground')).toBe(true);
	});

	it('picks different signals over many runs', () => {
		let signalQuestions = generateMany(200).filter((q) => q.mode !== 'confirmation');
		let labels = new Set(signalQuestions.map((q) => `${q.signal.situation}-${q.signal.label}`));
		expect(labels.size).toBeGreaterThan(3);
	});

	it('includes pyrotechnic signals', () => {
		let signalQuestions = generateMany(200).filter((q) => q.mode !== 'confirmation');
		let types = new Set(signalQuestions.map((q) => q.signal.type));
		expect(types.has('pyrotechnic')).toBe(true);
		expect(types.has('light')).toBe(true);
	});

	it('generates all modes over many runs', () => {
		let modes = new Set(generateMany(200).map((q) => q.mode));
		expect(modes.has('signal-to-meaning')).toBe(true);
		expect(modes.has('meaning-to-signal')).toBe(true);
		expect(modes.has('confirmation')).toBe(true);
	});

	describe('signal-to-meaning', () => {
		function generate(): SignalToMeaning {
			let q;
			do {
				q = generateQuestion();
			} while (q.mode !== 'signal-to-meaning');
			return q;
		}

		it('answers are meaning strings from the same situation', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				let validMeanings = signalsForSituation(q.signal.situation).map((s) => s.meaning);
				for (let answer of q.answers) {
					expect(validMeanings).toContain(answer);
				}
			}
		});

		it('includes the correct meaning among answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				expect(q.answers).toContain(q.signal.meaning);
			}
		});

		it('does not include duplicate answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				expect(new Set(q.answers).size).toBe(4);
			}
		});
	});

	describe('confirmation', () => {
		function generate(): ConfirmationQuestion {
			let q;
			do {
				q = generateQuestion();
			} while (q.mode !== 'confirmation');
			return q;
		}

		it('answers include the correct answer', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				expect(q.answers).toContain(q.confirmation.correctAnswer);
			}
		});

		it('always returns 4 answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				expect(q.answers).toHaveLength(4);
			}
		});

		it('answers are the correct answer plus the wrong answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				let expected = [q.confirmation.correctAnswer, ...q.confirmation.wrongAnswers];
				expect([...q.answers].sort()).toEqual([...expected].sort());
			}
		});

		it('does not include duplicate answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				expect(new Set(q.answers).size).toBe(4);
			}
		});

		it('picks confirmations from all situations and times over many runs', () => {
			let keys = new Set<string>();
			for (let i = 0; i < 200; i++) {
				let q = generate();
				keys.add(`${q.confirmation.situation}-${q.confirmation.time}`);
			}
			expect(keys).toEqual(new Set(['ground-day', 'ground-night', 'flight-day', 'flight-night']));
		});
	});

	describe('meaning-to-signal', () => {
		function generate(): MeaningToSignal {
			let q;
			do {
				q = generateQuestion();
			} while (q.mode !== 'meaning-to-signal');
			return q;
		}

		it('answers are signals from the same situation', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				let validSignals = signalsForSituation(q.signal.situation);
				for (let answer of q.answers) {
					expect(validSignals).toContainEqual(answer);
				}
			}
		});

		it('includes the correct signal among answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				expect(q.answers).toContainEqual(q.signal);
			}
		});

		it('does not include duplicate answers', () => {
			for (let i = 0; i < 50; i++) {
				let q = generate();
				let labels = q.answers.map((s) => s.label);
				expect(new Set(labels).size).toBe(4);
			}
		});
	});
});
