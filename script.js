import { LinkedList } from '/modules/Linkedlist.js';

let list = new LinkedList();
list.add(1);
list.add(2);
list.add(4);
list.add(5);

list.insertBetween(3, 2); // Insert 3 after 2
list.print(); // Output: 1 -> 2 -> 3 -> 4 -> 5

const NUMNOTES = 8;

const allNotesNatural = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function getNotesInKey(key) {
	let objectNotes = new Map();
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
const myNotes = getNotesInKey('c');
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

console.log(getMajor(myNotes));

function majorScaleCreator(scale) {
	switch (scale) {
		case 'a':
			break;

		case 'b':
			break;

		case 'c':
			break;

		case 'd':
			break;

		case 'e':
			break;

		case 'f':
			break;

		case 'g':
			break;

		default:
			break;
	}
}

class keys {
	getKeys() {}
}
