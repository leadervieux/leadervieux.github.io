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
		titre: "Minesweeper",
		description: "The goal of this project is to create a functional version of Minesweeper, a classic game where the player must uncover squares on a grid without touching the mines. This project was carried out as part of an object-oriented programming course, using Java to implement a console version of this game. The development relies on a class diagram and several sequence diagrams allowing the program architecture to be structured before its implementation. The game is developed in a console version and adheres to the classic Minesweeper rules.",
		images: [],
		github: "https://github.com/leadervieux/Minesweeper-in-Java.git",
		rapport: "démineur_DERVIEUX.pdf"
	},
	"Power-BI": {
		titre: "Data Vizualisation with Power BI",
		description: "This group project, carried out in class, involves manipulating Power BI for the benefit of a company (which can be fictitious), by proposing areas for improvement.",
		images: [],
		github: null,
		rapport: null
	},
	"Vasopressor-use": {
		titre: "Vasopressor use for non-cardiac surgery",
		description: "Sex as an independent risk factor for postoperative vasopressor infusion after noncardiac surgery. The scientific report is coming...",
		images: [],
		github: null,
		rapport: null
	},
	"fraud-detection": {
        titre: "Détection de Fraude",
        description: "Transaction analyses and forecasting fraud, from a Kaggle competition.",
        images: [],
        github: "https://github.com/leadervieux/Fraud-project.git",
        rapport: null
	},
	"CFS-impact": {
		titre: "CFS impact compared to ASA",
		description: "Comparison of the Clinical Frailty Score and ASA Score Versus ASA Score Alone in Predicting Postoperative Outcomes in Non-Cardiac Surgery Patients. The scientific report is coming...",
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
window.onload = function() {
	// On ne lance la fonction que si on est sur la page generic.html
	if (window.location.pathname.includes("generic.html")) {
		chargerProjet();
	}
};

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
