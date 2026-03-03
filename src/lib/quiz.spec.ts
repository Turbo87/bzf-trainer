import { describe, expect, it } from 'vitest';
import { generateQuestion } from './quiz';
import { SIGNALS, signalsForSituation } from './signals';

describe('generateQuestion', () => {
	it('returns a signal with 4 answers', () => {
		const question = generateQuestion();
		expect(question.signal).toBeDefined();
		expect(question.answers).toHaveLength(4);
	});

	it('includes the correct answer among the answers', () => {
		const question = generateQuestion();
		expect(question.answers).toContain(question.signal.meaning);
	});

	it('does not include duplicate answers', () => {
		for (let i = 0; i < 50; i++) {
			const question = generateQuestion();
			const unique = new Set(question.answers);
			expect(unique.size).toBe(4);
		}
	});

	it('only includes answers from the same situation', () => {
		for (let i = 0; i < 50; i++) {
			const question = generateQuestion();
			const validMeanings = signalsForSituation(question.signal.situation).map(
				(s) => s.meaning,
			);
			for (const answer of question.answers) {
				expect(validMeanings).toContain(answer);
			}
		}
	});

	it('picks signals from both situations over many runs', () => {
		const situations = new Set<string>();
		for (let i = 0; i < 100; i++) {
			const question = generateQuestion();
			situations.add(question.signal.situation);
		}
		expect(situations.has('flight')).toBe(true);
		expect(situations.has('ground')).toBe(true);
	});

	it('picks different signals over many runs', () => {
		const labels = new Set<string>();
		for (let i = 0; i < 100; i++) {
			const question = generateQuestion();
			labels.add(`${question.signal.situation}-${question.signal.label}`);
		}
		expect(labels.size).toBeGreaterThan(3);
	});

	it('includes pyrotechnic signals', () => {
		const types = new Set<string>();
		for (let i = 0; i < 200; i++) {
			const question = generateQuestion();
			types.add(question.signal.type);
		}
		expect(types.has('pyrotechnic')).toBe(true);
		expect(types.has('light')).toBe(true);
	});
});
