// import { LinkedList } from '/modules/Linkedlist.js';

// let list = new LinkedList();
// list.add(1);
// list.add(2);
// list.add(4);
// list.add(5);

// list.insertBetween(3, 2); // Insert 3 after 2
// list.print(); // Output: 1 -> 2 -> 3 -> 4 -> 5

const NUMNOTES = 8;

const chromatic = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
	'B#',
	'C',
];
const allNotesNatural = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const scalesWithSharps = ['G', 'D', 'A', 'E'];
const scalesWithFlats = ['F', 'Bb', 'Eb', 'Eb'];
const majorSteps = [2, 2, 1, 2, 2, 2, 1];

function getMajorScale(root) {
	//Major scale pattern
	// I     - Major
	// ii    - Minor
	// iii   - Minor
	// IV    - Major
	// V     - Major
	// vi    - Minor
	// vii°  - Diminished

	const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

	const rootIndex = chromatic.indexOf(root);
	if (rootIndex === -1) throw new Error('Invalid root note');

	const scale = [root];
	let noteIndex = rootIndex;
	let letterIndex = letters.indexOf(root[0]);

	for (let step of majorSteps) {
		//  12-tone scale
		noteIndex = (noteIndex + step) % 12;
		letterIndex = (letterIndex + 1) % 7;

		const expectedLetter = letters[letterIndex];

		// Filter chromatic notes at the right pitch that match the expected letter
		const candidates = chromatic.filter(
			(n) => chromatic.indexOf(n) === noteIndex && n[0] === expectedLetter
		);

		// Use the match if found, otherwise fallback and fix common enharmonics manually
		let match = candidates[0] || chromatic[noteIndex];

		// Fix F -> E#, C -> B# if needed
		if (expectedLetter === 'E' && match === 'F') match = 'E#';
		if (expectedLetter === 'B' && match === 'C') match = 'B#';

		scale.push(match);
	}

	return scale;
}

function getBaseMajorChordsInKey(key) {
	const majorChordPattern = [0, 4, 7];
	const scale = getMajorScale(key);

	let chordsArray = [];

	for (let i = 0; i < scale.length - 1; i++) {
		let rootNote = scale[i];
		let rootIndexInChromatic = chromatic.findIndex((n) => n === rootNote);
		let notesInChord = [];

		for (let j = 0; j < majorChordPattern.length; j++) {
			const noteIndex =
				(rootIndexInChromatic + majorChordPattern[j]) %
				chromatic.length;
			const chordNote = chromatic[noteIndex];
			notesInChord.push(chordNote);
		}

		chordsArray.push(notesInChord);
	}
	return chordsArray;
}

function getMinorTriadsInKey(key) {
	const scale = getMajorScale(key);
	const minorTriadIndices = [1, 2, 5]; // ii, iii, vi in major scale

	const minorChords = [];

	for (let i of minorTriadIndices) {
		const root = scale[i % 7];
		const third = scale[(i + 2) % 7];
		const fifth = scale[(i + 4) % 7];

		minorChords.push([root, third, fifth]);
	}

	return minorChords;
}

function getDiatonicSeventhChords(key) {
	// major, minor, minor, major, dominant, minor, half-diminished
	const scale = getMajorScale(key);
	const seventhChords = [];

	for (let i = 0; i < 7; i++) {
		const root = scale[i % 7];
		const third = scale[(i + 2) % 7];
		const fifth = scale[(i + 4) % 7];
		const seventh = scale[(i + 6) % 7];

		seventhChords.push([root, third, fifth, seventh]);
	}

	return seventhChords;
}

console.log('majorscale', getMajorScale('C'));
console.log('majorchords', getBaseMajorChordsInKey('C'));
console.log('minortriads', getMinorTriadsInKey('C'));
console.log('seventhchords', getDiatonicSeventhChords('C'));

// function highlightChord() {
// 	const key = document.getElementById('keySelect').value;
// 	const chordType = document.getElementById('chordSelect').value;
// 	const formula = chordFormulas[chordType];

// 	const rootIndex = chromatic.indexOf(key);
// 	if (rootIndex === -1) return;

// 	const chordNotes = formula.map(
// 		(interval) => chromatic[(rootIndex + interval) % chromatic.length]
// 	);

// 	document.querySelectorAll('.key').forEach((el) => {
// 		const note = el.dataset.note;
// 		if (chordNotes.includes(note)) {
// 			el.style.backgroundColor = 'yellow';
// 		} else {
// 			el.style.backgroundColor = el.classList.contains('white')
// 				? 'white'
// 				: 'black';
// 		}
// 	});
// }

const chromaticForDisplay = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
];

// ==HIGHLIGHTING FOR KEYBOARD==
const chordFormulas = {
	major: [0, 4, 7],
	minor: [0, 3, 7],
	diminished: [0, 3, 6],
	maj7: [0, 4, 7, 11],
	min7: [0, 3, 7, 10],
	dom7: [0, 4, 7, 10],
};

function highlightChord() {
	const key = document.getElementById('keySelect').value;
	const chordType = document.getElementById('chordSelect').value;
	const formula = chordFormulas[chordType];

	const rootIndex = chromaticForDisplay.indexOf(key);
	if (rootIndex === -1) return;

	// Calculate the chord notes
	const chordNotes = formula.map(
		(interval) =>
			chromaticForDisplay[
				(rootIndex + interval) % chromaticForDisplay.length
			]
	);

	// Reset all key styles
	document.querySelectorAll('.key').forEach((element) => {
		const isWhite = element.classList.contains('white');
		element.style.backgroundColor = isWhite ? 'white' : 'black';
	});

	// Highlight the chord notes
	document.querySelectorAll('.key').forEach((element) => {
		if (chordNotes.includes(element.dataset.note)) {
			element.style.backgroundColor = 'red';
		}
	});
}
const highlightBtn = document.getElementById('highlight');
highlightBtn.addEventListener('click', (e) => {
	highlightChord();
});

// ==HIGHLIGHT GUITAR==

const guitarChords = {
	C: ['x', 3, 2, 0, 1, 0],
	G: [3, 2, 0, 0, 0, 3],
	D: ['x', 'x', 0, 2, 3, 2],
	Em: [0, 2, 2, 0, 0, 0],
	Am: ['x', 0, 2, 2, 1, 0],
	F: [1, 3, 3, 2, 1, 1],
};

// function displayGuitarChord() {
// 	const chordName = document.getElementById('guitarChordSelect').value;
// 	const frets = guitarChords[chordName];
// 	if (!frets) return;

// 	const strings = document.querySelectorAll('.fretboard .string');

// 	strings.forEach((string, index) => {
// 		string.innerHTML = ''; // Clear previous markers
// 		const fret = frets[index];

// 		if (fret === 'x') {
// 			// Optional: Add mute mark (X)
// 		} else if (fret !== undefined) {
// 			const dot = document.createElement('div');
// 			dot.classList.add('fret-marker');
// 			dot.style.left = `${(fret + 0.5) * 20}%`; // crude positioning
// 			string.appendChild(dot);
// 		}
// 	});
// }

// Dynamically build 5 rows x 6 columns = 30 fret boxes
function buildFretboardGrid() {
	const fretboard = document.getElementById('fretboard');

	for (let i = 0; i < 30; i++) {
		const fret = document.createElement('div');
		fret.classList.add('fret');
		fretboard.appendChild(fret);
	}
}

// Run on page load
buildFretboardGrid();

function displayGuitarChord() {
	const chordName = document.getElementById('guitarChordSelect').value;
	const frets = guitarChords[chordName];
	const overlay = document.getElementById('fretboard-overlay');
	overlay.innerHTML = '';

	if (!frets) return;

	frets.forEach((fret, stringIndex) => {
		if (fret === 'x' || fret === 0) return; // skip open or muted
		const dot = document.createElement('div');
		dot.classList.add('fret-marker');

		// Positioning: horizontal by string (6 strings), vertical by fret (5 frets)
		const stringPct = (stringIndex + 0.5) * (100 / 6);
		const fretPct = (fret - 0.5) * (100 / 5); // shift down half a fret for visual

		dot.style.left = `${stringPct}%`;
		dot.style.top = `${fretPct}%`;

		overlay.appendChild(dot);
	});
}

const guitarSelect = document.getElementById('guitarChordSelect');
guitarSelect.addEventListener('change', (e) => {
	displayGuitarChord();
});

// highlightGuitarChord(['x', 3, 2, 0, 1, 0]); // EADGBE

// ==CHORD TRANSPOSE==

function transposeChords() {
	const input = document
		.getElementById('chordInput')
		.value.toUpperCase()
		.trim();

	// .value.toUpperCase()
	// .trim();
	const interval = parseInt(document.getElementById('transposeAmount').value);
	const chords = input.split(/\s+/);

	const transposed = chords.map((chord) => {
		// separate root and suffix
		const match = chord.match(/^([A-G][b#]?)(.*)$/);

		// Default
		if (!match) return chord;

		const [_, root, suffix] = match;
		let index = chromatic.indexOf(root);

		// unknown root
		if (index === -1) return chord;

		let transposedRoot =
			chromatic[(index + interval + chromatic.length) % chromatic.length];
		return transposedRoot + suffix;
	});

	document.getElementById('transposedChords').innerText =
		transposed.join(' ');
}
const transposeBtn = document.getElementById('transpose');
transposeBtn.addEventListener('click', (e) => {
	transposeChords();
});
