import { Node } from './node.js';

export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = new Node(key, value);
  }

  find(key) {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  remove(key) {
    if (!this.head) return null;

    if (this.head.key === key) {
      const removedNode = this.head;
      this.head = this.head.next;
      return removedNode;
    }

    let current = this.head;
    while (current.next && current.next.key !== key) {
      current = current.next;
    }

    if (!current.next) return null;

    const removedNode = current.next;
    current.next = current.next.next;
    return removedNode;
  }
}
