<script lang="ts">
	import { generateQuestion, type Question } from '$lib/quiz';

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

	{#if question.signal.type === 'light'}
		<div
			class="light {question.signal.color} {question.signal.pattern}"
			role="img"
			aria-label={question.signal.label}
		></div>
	{:else}
		{@const colors = question.signal.colors}
		<div class="pyro" role="img" aria-label={question.signal.label}>
			{#each { length: 6 } as _, i}
				<span class="spark {colors[i % colors.length]}" class:delay-1={i % 3 === 1} class:delay-2={i % 3 === 2}></span>
			{/each}
		</div>
	{/if}

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

	.light {
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		margin: 1rem 0;
	}

	.light.green {
		background: #22c55e;
		box-shadow:
			0 0 30px #22c55e,
			0 0 60px #22c55eaa,
			0 0 100px #22c55e55;
	}

	.light.red {
		background: #ef4444;
		box-shadow:
			0 0 30px #ef4444,
			0 0 60px #ef4444aa,
			0 0 100px #ef444455;
	}

	.light.white {
		background: #e8e8e8;
		box-shadow:
			0 0 30px #ffffff,
			0 0 60px #ffffffaa,
			0 0 100px #ffffff55;
	}

	.light.blinking {
		animation: blink 1s ease-in-out infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.05;
		}
	}

	.pyro {
		width: 8rem;
		height: 8rem;
		margin: 1rem 0;
		position: relative;
	}

	.spark {
		position: absolute;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		animation: burst 1.4s ease-out infinite;
	}

	.spark.red {
		background: #ef4444;
		box-shadow: 0 0 8px #ef4444;
	}

	.spark.white {
		background: #e8e8e8;
		box-shadow: 0 0 8px #ffffff;
	}

	.spark.green {
		background: #22c55e;
		box-shadow: 0 0 8px #22c55e;
	}

	.spark:nth-child(1) {
		top: 50%;
		left: 50%;
		--dx: -3rem;
		--dy: -3.5rem;
	}
	.spark:nth-child(2) {
		top: 50%;
		left: 50%;
		--dx: 3.2rem;
		--dy: -2rem;
	}
	.spark:nth-child(3) {
		top: 50%;
		left: 50%;
		--dx: -1rem;
		--dy: 3.5rem;
	}
	.spark:nth-child(4) {
		top: 50%;
		left: 50%;
		--dx: 2.5rem;
		--dy: 2.8rem;
	}
	.spark:nth-child(5) {
		top: 50%;
		left: 50%;
		--dx: -3.5rem;
		--dy: 1rem;
	}
	.spark:nth-child(6) {
		top: 50%;
		left: 50%;
		--dx: 1rem;
		--dy: -3rem;
	}

	.spark.delay-1 {
		animation-delay: 0.3s;
	}
	.spark.delay-2 {
		animation-delay: 0.6s;
	}
	.spark.delay-3 {
		animation-delay: 0.9s;
	}

	@keyframes burst {
		0% {
			transform: translate(0, 0) scale(0);
			opacity: 0;
		}
		20% {
			opacity: 1;
			transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.3)) scale(1);
		}
		100% {
			transform: translate(var(--dx), var(--dy)) scale(0);
			opacity: 0;
		}
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
