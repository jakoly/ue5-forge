document.addEventListener('DOMContentLoaded', function() {
	// Vorhandenen Download-Button suchen oder neu anlegen
	let downloadBtn = document.getElementById('downloadBtn');
	const form = document.querySelector('form') || document.body;
	if (!downloadBtn) {
		downloadBtn = document.createElement('button');
		downloadBtn.id = 'downloadBtn';
		downloadBtn.type = 'button';
		downloadBtn.textContent = 'Download Template';
		// Button ans Ende des Formulars setzen
		form.appendChild(downloadBtn);
	}

	downloadBtn.addEventListener('click', function(event) {
		// Falls der Button innerhalb eines Formulars ist: Default-Submit verhindern
		if (event && typeof event.preventDefault === 'function') event.preventDefault();

		const titleInput = document.getElementById('titleInput');
		// Tippfehler abfangen: 'desscriptionInput' oder korrekt 'descriptionInput'
		const descriptionInput = document.getElementById('descriptionInput') || document.getElementById('desscriptionInput');
		const ueVersionInput = document.querySelectorAll('.ue-version input')[0];

		const thirdPersonChecked = document.getElementById('thirdPerson') ? document.getElementById('thirdPerson').checked : false;
		const firstPersonChecked = document.getElementById('firstPerson') ? document.getElementById('firstPerson').checked : false;

		const damageSystemChecked = document.getElementById('damagesystem') ? document.getElementById('damagesystem').checked : false;
		const healthSystemChecked = document.getElementById('healthsystem') ? document.getElementById('healthsystem').checked : false;
		const interactionSystemChecked = document.getElementById('interactionsystem') ? document.getElementById('interactionsystem').checked : false;

		// Validierung: Mindestens eine Perspektive wählen
		if (!thirdPersonChecked && !firstPersonChecked) {
			alert('Bitte wähle eine Perspektive (Third Person oder First Person).');
			return;
		}

		// Titel validieren (Fallback, falls Input fehlt)
		const titleValue = titleInput && titleInput.value ? titleInput.value.trim() : '';
		if (!titleValue) {
			alert('Bitte gib einen Template-Namen ein.');
			return;
		}

		// Kombinationsprüfung - aktuell nur Third Person only verfügbar
		let templateFile = null;

		if (thirdPersonChecked && !firstPersonChecked) {
			// Nur Third Person
			templateFile = 'BP_ThirdPersonOnly.exe';
		} else if (firstPersonChecked && !thirdPersonChecked) {
			// Nur First Person - noch nicht implementiert
			alert('First Person Templates sind noch nicht verfügbar.');
			return;
		} else if (thirdPersonChecked && firstPersonChecked) {
			// Beide ausgewählt - noch nicht implementiert
			alert('Templates mit beiden Perspektiven sind noch nicht verfügbar.');
			return;
		}

		// Download starten
		if (templateFile) {
			// Aufruf: erst dateiname aus templates, dann gewünschter download-name
			downloadFile(templateFile, titleValue);
		}
	});

	function downloadFile(filepath, templateName) {
		// filepath ist nur der Dateiname aus dem templates-Ordner
		// URL relativ zur index.html auf das templates-Verzeichnis setzen
		const href = `templates/${filepath}`;

		// Template-Name sanitizen (ungültige Dateinamen-Zeichen ersetzen)
		const safeName = (templateName || 'template').replace(/[\/\\:?<>|"\*\x00-\x1F]/g, '_');

		const link = document.createElement('a');
		link.href = href;
		link.download = `${safeName}.exe`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
});
