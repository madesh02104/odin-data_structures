import { LinkedList } from './linkedList.js';

export class HashMap {
  constructor(initialSize = 16) {
    this.buckets = new Array(initialSize).fill(null).map(() => new LinkedList());
    this.size = 0;
  }

  hash(key) {
    let hash = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hash = (prime * hash + key.charCodeAt(i)) % this.buckets.length;
    }
    return hash;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    const existingNode = bucket.find(key);
    if (existingNode) {
      existingNode.value = value;
    } else {
      bucket.append(key, value);
      this.size++;
    }

    if (this.size / this.buckets.length > 0.75) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    const node = bucket.find(key);
    return node ? node.value : null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    return bucket.find(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    const removedNode = bucket.remove(key);
    if (removedNode) {
      this.size--;
      return removedNode.value;
    }
    return null;
  }

  resize() {
    const newBuckets = new Array(this.buckets.length * 2).fill(null).map(() => new LinkedList());
    this.buckets.forEach(bucket => {
      let current = bucket.head;
      while (current) {
        const index = this.hash(current.key);
        newBuckets[index].append(current.key, current.value);
        current = current.next;
      }
    });
    this.buckets = newBuckets;
  }

  keys() {
    const keys = [];
    this.buckets.forEach(bucket => {
      let current = bucket.head;
      while (current) {
        keys.push(current.key);
        current = current.next;
      }
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach(bucket => {
      let current = bucket.head;
      while (current) {
        values.push(current.value);
        current = current.next;
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach(bucket => {
      let current = bucket.head;
      while (current) {
        entries.push([current.key, current.value]);
        current = current.next;
      }
    });
    return entries;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => new LinkedList());
    this.size = 0;
  }
}
