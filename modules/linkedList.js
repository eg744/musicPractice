export { LinkedList };

class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	insertBetween(value, afterValue) {
		let current = this.head;
		while (current && current.value !== afterValue) {
			current = current.next;
		}
		if (current) {
			let newNode = new Node(value);
			newNode.next = current.next;
			current.next = newNode;
		}
	}

	add(value) {
		let newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = newNode;
		}
	}

	print() {
		let current = this.head;
		let result = [];
		while (current) {
			result.push(current.value);
			current = current.next;
		}
		console.log(result.join(' -> '));
	}
}
