<script lang="ts">
	import { generateQuestion, type Question } from '$lib/quiz';
	import SignalDisplay from '$lib/SignalDisplay.svelte';

	let question: Question = $state(generateQuestion());
	let selectedAnswer: string | null = $state(null);

	function select(answer: string) {
		selectedAnswer = answer;
	}

	function next() {
		question = generateQuestion();
		selectedAnswer = null;
	}

	let isCorrect = $derived(selectedAnswer === question.signal.meaning);
	let situationLabel = $derived(question.signal.situation === 'flight' ? 'Im Flug' : 'Am Boden');
	let situationIcon = $derived(question.signal.situation === 'flight' ? '✈' : '🛞');
</script>

<div class="quiz">
	<span class="situation-badge {question.signal.situation}" data-testid="situation"
		>{situationIcon} {situationLabel}</span
	>

	<SignalDisplay signal={question.signal} />

	<h1>{question.signal.label}</h1>

	{#if selectedAnswer === null}
		<div class="answers">
			{#each question.answers as answer}
				<button class="answer-btn" onclick={() => select(answer)}>{answer}</button>
			{/each}
		</div>
	{:else}
		<div class="result {isCorrect ? 'correct' : 'wrong'}" data-testid="result">
			{#if isCorrect}
				<p>Richtig!</p>
			{:else}
				<p>Falsch! Die richtige Antwort ist:</p>
				<p><strong>{question.signal.meaning}</strong></p>
			{/if}
		</div>
		<button class="next-btn" onclick={next}>Weiter</button>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		background: #0f172a;
		color: #e2e8f0;
		font-family: system-ui, -apple-system, sans-serif;
		min-height: 100dvh;
	}

	.quiz {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 2rem 1rem;
		max-width: 36rem;
		margin: 0 auto;
	}

	.situation-badge {
		font-size: 1.125rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.5rem 1.25rem;
		border-radius: 999px;
	}

	.situation-badge.flight {
		background: #0c4a6e;
		color: #7dd3fc;
		border: 1px solid #0369a1;
	}

	.situation-badge.ground {
		background: #451a03;
		color: #fdba74;
		border: 1px solid #c2410c;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		text-align: center;
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.answer-btn {
		padding: 1rem 1.25rem;
		font-size: 1rem;
		border: 1px solid #334155;
		border-radius: 0.5rem;
		background: #1e293b;
		color: #e2e8f0;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s;
		text-align: left;
	}

	.answer-btn:hover {
		background: #334155;
		border-color: #475569;
	}

	.result {
		text-align: center;
		padding: 1.5rem;
		border-radius: 0.75rem;
		width: 100%;
		box-sizing: border-box;
	}

	.result.correct {
		background: #052e16;
		border: 1px solid #16a34a;
	}

	.result.wrong {
		background: #350a0a;
		border: 1px solid #dc2626;
	}

	.result p {
		margin: 0.25rem 0;
	}

	.next-btn {
		padding: 0.875rem 2.5rem;
		font-size: 1rem;
		font-weight: 600;
		border: none;
		border-radius: 0.5rem;
		background: #3b82f6;
		color: white;
		cursor: pointer;
		transition: background 0.15s;
	}

	.next-btn:hover {
		background: #2563eb;
	}
</style>
