import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';
import { SIGNALS } from '$lib/signals';

const ALL_MEANINGS = SIGNALS.map((s) => s.meaning);
const ALL_LABELS = [...new Set(SIGNALS.map((s) => s.label))];

describe('/+page.svelte', () => {
	it('shows a signal label and situation', async () => {
		render(Page);

		let heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
		let headingText = heading.element().textContent!;
		expect(ALL_LABELS.some((label) => headingText.includes(label))).toBe(true);
	});

	it('shows the situation context', async () => {
		render(Page);

		let situationEl = page.getByTestId('situation');
		await expect.element(situationEl).toBeInTheDocument();
		let text = situationEl.element().textContent!;
		expect(text === 'Im Flug' || text === 'Am Boden').toBe(true);
	});

	it('shows 4 answer buttons', async () => {
		render(Page);

		let buttons = page.getByRole('button');
		await expect.element(buttons.first()).toBeInTheDocument();
		let allButtons = await buttons.elements();
		expect(allButtons).toHaveLength(4);
	});

	it('answer buttons contain valid meanings', async () => {
		render(Page);

		let buttons = page.getByRole('button');
		await expect.element(buttons.first()).toBeInTheDocument();
		let allButtons = await buttons.elements();
		for (let button of allButtons) {
			expect(ALL_MEANINGS).toContain(button.textContent!.trim());
		}
	});

	it('shows result after clicking an answer', async () => {
		render(Page);

		let buttons = page.getByRole('button');
		await expect.element(buttons.first()).toBeInTheDocument();
		await buttons.first().click();

		let result = page.getByTestId('result');
		await expect.element(result).toBeInTheDocument();
	});

	it('shows "Weiter" button after answering', async () => {
		render(Page);

		let firstButton = page.getByRole('button').first();
		await expect.element(firstButton).toBeInTheDocument();
		await firstButton.click();

		let weiterButton = page.getByRole('button', { name: 'Weiter' });
		await expect.element(weiterButton).toBeInTheDocument();
	});

	it('shows a new question after clicking "Weiter"', async () => {
		render(Page);

		let firstButton = page.getByRole('button').first();
		await expect.element(firstButton).toBeInTheDocument();
		await firstButton.click();

		let weiterButton = page.getByRole('button', { name: 'Weiter' });
		await expect.element(weiterButton).toBeInTheDocument();
		await weiterButton.click();

		// Should be back to 4 answer buttons
		let buttons = page.getByRole('button');
		await expect.element(buttons.first()).toBeInTheDocument();
		let allButtons = await buttons.elements();
		expect(allButtons).toHaveLength(4);
	});
});
