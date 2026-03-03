<script lang="ts">
	import type { Signal } from './signals';

	let { signal, size = 'large' }: { signal: Signal; size?: 'large' | 'small' } = $props();
</script>

{#if signal.type === 'light'}
	<div
		class="light {signal.color} {signal.pattern} {size}"
		role="img"
		aria-label={signal.label}
	></div>
{:else}
	{@const colors = signal.colors}
	<div class="pyro {size}" role="img" aria-label={signal.label}>
		{#each { length: 6 } as _, i}
			<span
				class="spark {colors[i % colors.length]}"
				class:delay-1={i % 3 === 1}
				class:delay-2={i % 3 === 2}
			></span>
		{/each}
	</div>
{/if}

<style>
	.light {
		border-radius: 50%;
	}

	.light.large {
		width: 8rem;
		height: 8rem;
		margin: 1rem 0;
	}

	.light.small {
		width: 2.5rem;
		height: 2.5rem;
	}

	.light.green {
		background: #22c55e;
		box-shadow:
			0 0 30px #22c55e,
			0 0 60px #22c55eaa,
			0 0 100px #22c55e55;
	}

	.light.small.green {
		box-shadow:
			0 0 10px #22c55e,
			0 0 20px #22c55eaa;
	}

	.light.red {
		background: #ef4444;
		box-shadow:
			0 0 30px #ef4444,
			0 0 60px #ef4444aa,
			0 0 100px #ef444455;
	}

	.light.small.red {
		box-shadow:
			0 0 10px #ef4444,
			0 0 20px #ef4444aa;
	}

	.light.white {
		background: #e8e8e8;
		box-shadow:
			0 0 30px #ffffff,
			0 0 60px #ffffffaa,
			0 0 100px #ffffff55;
	}

	.light.small.white {
		box-shadow:
			0 0 10px #ffffff,
			0 0 20px #ffffffaa;
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
		position: relative;
	}

	.pyro.large {
		width: 8rem;
		height: 8rem;
		margin: 1rem 0;
	}

	.pyro.small {
		width: 2.5rem;
		height: 2.5rem;
	}

	.spark {
		position: absolute;
		border-radius: 50%;
		animation: burst 1.4s ease-out infinite;
	}

	.pyro.large .spark {
		width: 0.75rem;
		height: 0.75rem;
	}

	.pyro.small .spark {
		width: 0.375rem;
		height: 0.375rem;
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

	.pyro.small .spark {
		box-shadow: none;
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

	.pyro.small .spark:nth-child(1) {
		--dx: -1rem;
		--dy: -1.1rem;
	}
	.pyro.small .spark:nth-child(2) {
		--dx: 1rem;
		--dy: -0.6rem;
	}
	.pyro.small .spark:nth-child(3) {
		--dx: -0.3rem;
		--dy: 1.1rem;
	}
	.pyro.small .spark:nth-child(4) {
		--dx: 0.8rem;
		--dy: 0.9rem;
	}
	.pyro.small .spark:nth-child(5) {
		--dx: -1.1rem;
		--dy: 0.3rem;
	}
	.pyro.small .spark:nth-child(6) {
		--dx: 0.3rem;
		--dy: -1rem;
	}

	.spark.delay-1 {
		animation-delay: 0.3s;
	}
	.spark.delay-2 {
		animation-delay: 0.6s;
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
</style>
