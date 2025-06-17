import { LinkedList } from '/modules/Linkedlist.js';

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
	// Chromatic scale with enharmonic spelling options
	// const chromatic = [
	// 	'C',
	// 	'C#',
	// 	'D',
	// 	'D#',
	// 	'E',
	// 	'F',
	// 	'F#',
	// 	'G',
	// 	'G#',
	// 	'A',
	// 	'A#',
	// 	'B',
	// 	'B#',
	// 	'C',
	// ];

	// const majorSteps = [2, 2, 1, 2, 2, 2, 1];
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
	const majorChordPattern = [0, 4, 3];
	const scale = getMajorScale(key);

	let chordsArray = [];

	for (let i = 0; i < scale.length - 1; i++) {
		for (let n in chromatic) {
			if (chromatic[n] == scale[i]) {
				console.log('chromaticn', chromatic[n]);
			}
			// console.log(n);
		}
		let notesInChord = [];

		chordsArray.push(notesInChord);
	}
	return chordsArray;
}

console.log('majorscale', getMajorScale('B'));
console.log(getBaseMajorChordsInKey('B'));

function getNotesInKey(key) {
	let arrayNotes = [];
	for (let note in allNotesNatural) {
		let keyindex = 1;

		if (allNotesNatural[note] == key) {
			for (let i = note; i <= NUMNOTES; i++) {
				if (allNotesNatural[i] != undefined) {
					// objectNotes.set(keyindex, allNotesNatural[i]);
					// keyindex++;
					// console.log(allNotesNatural[i]);
					arrayNotes += allNotesNatural[i];
				}
				if (i > allNotesNatural.length) {
					let elemsAtStart =
						(NUMNOTES - allNotesNatural.length - note - 2) * -1;

					for (let j = 0; j < elemsAtStart; j++) {
						// objectNotes.set(keyindex, allNotesNatural[j]);
						// keyindex++;
						arrayNotes += allNotesNatural[j];
					}
				}
			}
		}
	}
	return arrayNotes;
	// return objectNotes;
}
// const myNotes = getNotesInKey('C');
// console.log(myNotes);

function getMajor(arrayNotes) {
	// let LLNotes = new Linkedlist();
	for (let note in arrayNotes) {
		let n = parseInt(note) + 1;

		// mapNotes.set(n, arrayNotes[note]);
		// console.log(arrayNotes[note]);
	}
	// return mapNotes;
}
