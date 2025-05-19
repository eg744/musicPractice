const NUMNOTES = 8;

const allNotesNatural = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function getNotesInKey(key) {
	let notes = {};
	for (note in allNotesNatural) {
		if (allNotesNatural[note] == key) {
			for (let i = note; i <= NUMNOTES; i++) {
				if (allNotesNatural[i] != undefined) {
					console.log(allNotesNatural[i]);
				}
				if (i > allNotesNatural.length) {
					for (
						let j = allNotesNatural.length - i + 1;
						j <= NUMNOTES - i + 1;
						j++
					) {
						console.log('j ', allNotesNatural[j]);
					}
				}
			}
		}
	}
}
getNotesInKey('c');

class keys {
	getKeys() {}
}
