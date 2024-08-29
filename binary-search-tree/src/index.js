import { Tree } from './tree.js';

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  

const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const bst = new Tree(randomArray);

console.log("Initial Tree (Balanced):");
prettyPrint(bst.root);

console.log("Is the tree balanced?", bst.isBalanced());

console.log("Level Order Traversal:");
bst.levelOrder(node => console.log(node.data));

console.log("Inorder Traversal:");
bst.inOrder(node => console.log(node.data));

console.log("Preorder Traversal:");
bst.preOrder(node => console.log(node.data));

console.log("Postorder Traversal:");
bst.postOrder(node => console.log(node.data));

// Unbalance the tree
bst.insert(105);
bst.insert(150);
bst.insert(200);

console.log("Tree after insertion (Unbalanced):");
prettyPrint(bst.root);
console.log("Is the tree balanced?", bst.isBalanced());

// Rebalance the tree
bst.rebalance();
console.log("Tree after rebalancing:");
prettyPrint(bst.root);
console.log("Is the tree balanced?", bst.isBalanced());

console.log("height of bst : ", bst.height());