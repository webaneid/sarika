/**
 * Funfact Counter Animation
 *
 * @package sarika
 */

document.addEventListener('DOMContentLoaded', function() {
	const counters = document.querySelectorAll('.sarika-funfact-number');

	if (counters.length === 0) {
		return;
	}

	const animateCounter = (counter) => {
		const target = parseFloat(counter.getAttribute('data-target'));
		const suffix = counter.getAttribute('data-suffix');
		const duration = 2000; // 2 seconds
		const steps = 60;
		const increment = target / steps;
		const stepDuration = duration / steps;
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				current = target;
				clearInterval(timer);
			}

			// Format number (handle decimals)
			let displayValue = current;
			if (target % 1 !== 0) {
				// Has decimal
				displayValue = current.toFixed(1);
			} else {
				displayValue = Math.floor(current);
			}

			counter.textContent = displayValue + suffix;
		}, stepDuration);
	};

	// Intersection Observer for animation on scroll
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				animateCounter(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	counters.forEach(counter => {
		observer.observe(counter);
	});
});
