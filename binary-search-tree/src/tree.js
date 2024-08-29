import { Node } from './node.js';

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.buildBalancedTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildBalancedTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildBalancedTree(array, start, mid - 1);
    root.right = this.buildBalancedTree(array, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  delete(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      root.data = this.minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }

    return root;
  }

  minValue(root) {
    let minValue = root.data;
    while (root.left !== null) {
      minValue = root.left.data;
      root = root.left;
    }
    return minValue;
  }

  find(value, root = this.root) {
    if (root === null || root.data === value) return root;

    if (value < root.data) return this.find(value, root.left);
    return this.find(value, root.right);
  }

  levelOrder(callback) {
    if (this.root === null) return;

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inOrder(callback, root = this.root) {
    if (root !== null) {
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    }
  }

  preOrder(callback, root = this.root) {
    if (root !== null) {
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    }
  }

  postOrder(callback, root = this.root) {
    if (root !== null) {
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    }
  }

  height(node = this.root) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, level = 0) {
    if (root === null) return 0;
    if (root === node) return level;

    let downlevel = this.depth(node, root.left, level + 1);
    if (downlevel !== 0) return downlevel;

    return this.depth(node, root.right, level + 1);
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)) {
      return true;
    }

    return false;
  }

  rebalance() {
    const values = [];
    this.inOrder((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }
}
