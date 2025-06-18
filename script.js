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
