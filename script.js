const NUMNOTES = 8;

const allNotesNatural = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function getNotesInKey(key) {
	let objectNotes = new Map();
	for (note in allNotesNatural) {
		let keyindex = 1;

		if (allNotesNatural[note] == key) {
			for (let i = note; i <= NUMNOTES; i++) {
				if (allNotesNatural[i] != undefined) {
					objectNotes.set(keyindex, allNotesNatural[i]);

					keyindex++;
					console.log(allNotesNatural[i]);
				}
				if (i > allNotesNatural.length) {
					let elemsAtStart =
						(NUMNOTES - allNotesNatural.length - note - 1) * -1;

					for (let j = 0; j < elemsAtStart; j++) {
						objectNotes.set(keyindex, allNotesNatural[j]);

						keyindex++;
					}
				}
			}
		}
	}
	return objectNotes;
}
const myNotes = getNotesInKey('c');
console.log(myNotes);

class keys {
	getKeys() {}
}
