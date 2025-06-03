import { LinkedList } from '/modules/Linkedlist.js';

// let list = new LinkedList();
// list.add(1);
// list.add(2);
// list.add(4);
// list.add(5);

// list.insertBetween(3, 2); // Insert 3 after 2
// list.print(); // Output: 1 -> 2 -> 3 -> 4 -> 5

const NUMNOTES = 8;

const chromaticScale = [
	'A',
	'A#',
	'B',
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
];
const allNotesNatural = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const scalesWithSharps = ['G', 'D', 'A', 'E'];
const scalesWithFlats = ['F', 'Bb', 'Eb', 'Eb'];
const majorScalePattern = [2, 2, 1, 2, 2, 2, 1];

function getMajorScale(root) {
	const startIndex = chromaticScale.indexOf(root);
	if (startIndex === -1) {
		throw new Error('Invalid root note');
	}

	let scale = [root];
	let currentIndex = startIndex;

	for (let step of majorScalePattern) {
		currentIndex = (currentIndex + step) % chromaticScale.length;
		scale.push(chromaticScale[currentIndex]);
	}

	return scale;
}

console.log('gms', getMajorScale('C#'));

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

function majorScaleCreator(scale) {
	// switch (scale) {
	// 	case 'a':
	// 		break;

	// 	case 'b':
	// 		break;

	// 	case 'c':
	// 		break;

	// 	case 'd':
	// 		break;

	// 	case 'e':
	// 		break;

	// 	case 'f':
	// 		break;

	// 	case 'g':
	// 		break;

	// 	default:
	// 		break;
	// }
	for (let i = 0; i < scalesWithSharps.length; i++) {
		if (scale == scalesWithSharps[i]) {
		} else if (scale == scalesWithFlats[i]) {
		} else {
			// C scale
		}
	}
}

class keys {
	getKeys() {}
}
