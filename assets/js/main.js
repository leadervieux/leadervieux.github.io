/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// 1. La liste des données : un seul objet "projets", complète/modifie ici pour ajouter ou changer un projet.
//    - images  : (optionnel) tableau de captures d'écran à afficher sous la description, ex: ["images/powerbi-1.png", "images/powerbi-2.png"]
//                Laisse le tableau vide [] si tu ne veux aucune image sur la page du projet.
//    - github  : mets null si tu ne veux PAS afficher le bouton GitHub
//    - rapport : mets null si tu ne veux PAS afficher le bouton Rapport (sinon, lien vers un PDF ou une page)
const projets = {
	"Minesweeper": {
		titre: "Minesweeper in Java",
		description: "School project built within a set deadline to learn Java and object-oriented programming. The game runs in the console and implements mine placement logic, cell uncovering, and win/loss detection. The full source code is on GitHub, along with a French report covering the game rules and key implementation choices.",
		images: [],
		github: "https://github.com/leadervieux/Minesweeper-in-Java.git",
		rapport: "démineur_DERVIEUX.pdf"
	},
	"Power-BI": {
		titre: "Data Visualisation with Power BI",
		description: "In this school project, we worked with a synthetic dataset from a fictional surveillance camera company. Using Power BI, we built a report featuring calculated columns, custom DAX measures, interactive maps and tables — designed to present data-driven sales arguments to potential buyers.",
		images: ["images/powerbi-1.png", "images/powerbi-2.png", "images/powerbi-3.png"],
		github: null,
		rapport: null
	},
	"Vasopressor-use": {
		titre: "Vasopressor Use After Non-Cardiac Surgery",
		description: "Conducted during a research internship at NORCE, in collaboration with Haukeland University Hospital (Bergen, Norway). The study analyses the SQUEEZE database, covering over 25,000 surgical patients, to investigate sex as an independent risk factor for postoperative vasopressor use. Logistic regression models with interaction terms were applied in RStudio. Scientific report in preparation.",
		images: [],
		github: null,
		rapport: null
	},
	"fraud-detection": {
		titre: "Fraud Detection — Kaggle Competition",
		description: "Personal project based on a Kaggle competition. Covers full exploratory data analysis (EDA) and hyperparameter tuning with Optuna. XGBoost and TimeSplit cross-validation were used to predict fraudulent transactions on imbalanced financial data. Public leaderboard score: 0.929 AUC — Private score: 0.892 AUC. Full code available on GitHub.",
		images: [],
		github: "https://github.com/leadervieux/Fraud-project.git",
		rapport: null
	},
	"CFS-impact": {
		titre: "Clinical Frailty Score vs ASA Score",
		description: "Conducted during a research internship at NORCE, in collaboration with Haukeland University Hospital (Bergen, Norway). Using RStudio, we compared the predictive power of the Clinical Frailty Score (CFS) and the ASA Score on postoperative outcomes after non-cardiac surgery. The project highlighted the limits of likelihood-ratio tests on large datasets, and applied ordinal and mixed-effects logistic regression models. Scientific report in preparation.",
		images: [],
		github: null,
		rapport: null
	},
	"diffusion-finance": {
		titre: "Diffusion Models Applied to Finance",
		description: "4th-year engineering project at Polytech Clermont, conducted with Maxime Brée. We explored score-based diffusion models (Kronos, TimeDiffusion, TimeGrad) for probabilistic forecasting of Bitcoin stock indicators on a dataset of ~300,000 time steps. The final model, TimeGrad, generates stochastic trajectories with calibrated 50% and 80% confidence intervals. Global trend accuracy reached ~50% over a 15-step horizon — close to random, reflecting the fundamental unpredictability of short-term markets, but the model's strength lies in correctly quantifying its own uncertainty rather than producing overconfident point predictions.",
		images: [],
		github: null,
		rapport: null
	}
};

// 2. Fonction d'affichage : remplit la page generic.html avec les infos du projet demandé dans l'URL (?id=...)
function chargerProjet() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	const data = projets[id];

	if (!data) return;

	// Remplissage dynamique
	document.getElementById('projet-titre').innerText = data.titre;
	document.getElementById('projet-desc').innerText = data.description;

	// Galerie de captures d'écran (uniquement si le projet en fournit)
	const galerie = document.getElementById('projet-gallery');
	if (galerie && data.images && data.images.length > 0) {
		galerie.innerHTML = data.images.map(function(src) {
			return '<span class="image fit"><img src="' + src + '" alt="" /></span>';
		}).join('');
	}

	// Gestion des liens
	const btnGit = document.getElementById('btn-github');
	if (data.github) {
		btnGit.href = data.github;
		btnGit.style.display = 'inline-block';
	} else {
		btnGit.style.display = 'none';
	}

	const btnRapport = document.getElementById('btn-rapport');
	if (data.rapport) {
		btnRapport.href = data.rapport;
		btnRapport.style.display = 'inline-block';
	} else {
		btnRapport.style.display = 'none';
	}
}

// 3. Exécution automatique au chargement de la page
window.addEventListener('DOMContentLoaded', function() {

	// ── Projet page ──────────────────────────────────────────────
	if (window.location.pathname.includes("generic.html")) {
		chargerProjet();
	}

	// ── Lightbox (pages projet avec galerie) ──────────────────────
	// Injection du HTML de la lightbox une seule fois
	var lbEl = document.getElementById('lightbox-overlay');
	if (!lbEl) {
		lbEl = document.createElement('div');
		lbEl.id = 'lightbox-overlay';
		lbEl.innerHTML =
			'<button id="lb-close" aria-label="Fermer">&times;</button>' +
			'<button id="lb-prev" aria-label="Précédent">&#8249;</button>' +
			'<img id="lb-img" src="" alt="" />' +
			'<button id="lb-next" aria-label="Suivant">&#8250;</button>';
		document.body.appendChild(lbEl);
	}

	var lbImages = []; // liste des src de la galerie active
	var lbCurrent = 0;

	function lbOpen(index) {
		lbCurrent = index;
		document.getElementById('lb-img').src = lbImages[lbCurrent];
		lbEl.classList.add('active');
		document.body.style.overflow = 'hidden';
		// Affiche/masque les flèches selon le nombre d'images
		document.getElementById('lb-prev').style.display = lbImages.length > 1 ? '' : 'none';
		document.getElementById('lb-next').style.display = lbImages.length > 1 ? '' : 'none';
	}

	function lbClose() {
		lbEl.classList.remove('active');
		document.body.style.overflow = '';
	}

	function lbMove(dir) {
		lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
		document.getElementById('lb-img').src = lbImages[lbCurrent];
	}

	document.getElementById('lb-close').addEventListener('click', lbClose);
	document.getElementById('lb-prev').addEventListener('click', function() { lbMove(-1); });
	document.getElementById('lb-next').addEventListener('click', function() { lbMove(1); });
	lbEl.addEventListener('click', function(e) { if (e.target === lbEl) lbClose(); });
	document.addEventListener('keydown', function(e) {
		if (!lbEl.classList.contains('active')) return;
		if (e.key === 'Escape') lbClose();
		if (e.key === 'ArrowLeft')  lbMove(-1);
		if (e.key === 'ArrowRight') lbMove(1);
	});

	// Attache la lightbox aux images de la galerie projet (injectées dynamiquement)
	// On utilise un MutationObserver car chargerProjet() s'exécute après cet event
	var gallery = document.getElementById('projet-gallery');
	if (gallery) {
		var observer = new MutationObserver(function() {
			var imgs = gallery.querySelectorAll('img');
			lbImages = Array.from(imgs).map(function(img) { return img.src; });
			imgs.forEach(function(img, i) {
				img.style.cursor = 'zoom-in';
				img.addEventListener('click', function() { lbOpen(i); });
			});
		});
		observer.observe(gallery, { childList: true });
	}

	// ── Formulaire Formspree (AJAX, toutes les pages) ─────────────
	var forms = document.querySelectorAll('#contact-form');
	forms.forEach(function(form) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			var statusEl = form.querySelector('#form-status');
			var submitBtn = form.querySelector('input[type="submit"]');
			submitBtn.disabled = true;
			submitBtn.value = 'Sending...';

			fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: { 'Accept': 'application/json' }
			}).then(function(response) {
				if (response.ok) {
					statusEl.textContent = '✓ Message sent! I\'ll get back to you soon.';
					statusEl.style.background = '#e8f5e9';
					statusEl.style.color = '#2e7d32';
					statusEl.style.display = 'block';
					form.reset();
					submitBtn.value = 'Send';
					submitBtn.disabled = false;
				} else {
					response.json().then(function(data) {
						statusEl.textContent = data.errors ? data.errors.map(function(e) { return e.message; }).join(', ') : 'Something went wrong. Please try again.';
						statusEl.style.background = '#fdecea';
						statusEl.style.color = '#c62828';
						statusEl.style.display = 'block';
						submitBtn.value = 'Send';
						submitBtn.disabled = false;
					});
				}
			}).catch(function() {
				statusEl.textContent = 'Network error. Please try again.';
				statusEl.style.background = '#fdecea';
				statusEl.style.color = '#c62828';
				statusEl.style.display = 'block';
				submitBtn.value = 'Send';
				submitBtn.disabled = false;
			});
		});
	});

});

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);
