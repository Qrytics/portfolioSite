<script lang="ts">
	type Photo = {
		src: string;
		position?: string; // CSS object-position value, e.g. '50% 40%'
	};

	const photos: Photo[] = [
		{ src: '/about/IMG_1400.jpeg' },
		{ src: '/about/IMG_6212.jpeg', position: '50% 5%' },
		{ src: '/about/IMG_0984.jpeg' },
		{ src: '/about/IMG_7164.PNG', position: '50% 5%' },
		{ src: '/about/IMG_5389.jpeg' },
		{ src: '/about/IMG_1342.jpeg' },
		{ src: '/about/IMG_7073.jpg' },
		{ src: '/about/IMG_0925.jpeg' },
		{ src: '/about/70e9b9f6-39d0-420a-baa1-84669c4387e5.JPG' },
		{ src: '/about/ECDF8558-EBA6-4CB7-B585-C8F7946242BE.JPG' },
		{ src: '/about/IMG_7163.PNG', position: '50% 5%' },
		{ src: '/about/IMG_1469.jpeg' },
		{ src: '/about/IMG_5397.jpeg' },
		{ src: '/about/IMG_6784.jpeg' },
		{ src: '/about/IMG_6654.jpeg' },
		{ src: '/about/IMG_1206.jpeg' },
		{ src: '/about/IMG_2626.jpeg', position: '50% 5%' },
		{ src: '/about/IMG_8025.JPEG' },
		{ src: '/about/IMG_5645.jpeg', position: '50% 5%' },
		{ src: '/about/61e28236-b3ed-4343-9375-61b7efb004f9.JPG' },
		{ src: '/about/IMG_7040.jpeg' },
		{ src: '/about/IMG_4474.jpeg' },
		{ src: '/about/cc8410d4-491c-41ba-a9c0-fb52ac5cc5bd.JPG' }
	];
</script>

<main class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">about me</h1>
			<p class="subtitle">A few snapshots with friends and family.</p>

			<div class="grid gallery" role="list">
				{#each photos as photo, i}
					<div class="card grid-item" role="listitem">
						<img
							class="img"
							src={photo.src}
							alt={`About me photo ${i + 1}`}
							loading="lazy"
							style={`object-position: ${photo.position ?? '50% 50%'}`}
						/>
					</div>
				{/each}
			</div>

			<div class="back-link">
				<a href="/">← back home</a>
			</div>
		</div>
	</section>
</main>

<style>
	.page {
		position: relative;
		isolation: isolate;
	}

	.section {
		position: relative;
		z-index: 1;
		padding: clamp(1.25rem, 4vw, 3rem);
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
	}

	.title {
		margin: 0 0 0.35rem;
		font-family: var(--font-mono);
		font-size: clamp(1.35rem, 3.2vw, 1.9rem);
		letter-spacing: 0.02em;
		color: rgba(243, 246, 255, 0.92);
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0 0 1.25rem;
		color: rgba(243, 246, 255, 0.68);
		max-width: 80ch;
		line-height: 1.7;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 0.85rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.1rem;
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	.card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
		display: block;
		transition: transform 0.3s ease;
	}

	.grid-item:hover .img {
		transform: scale(1.05);
	}

	.back-link {
		margin-top: 1.5rem;
	}

	.back-link a {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: rgba(243, 246, 255, 0.65);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.14s;
	}

	.back-link a:hover {
		color: var(--accent);
	}
</style>

