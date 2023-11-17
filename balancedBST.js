class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BalancedBST {
  constructor(arr) {
    this.#normalize(arr);
    this.root = this.#build(arr);
  }

  #normalize(arr) {
    arr.sort((numX, numY) => numX - numY);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === arr[i + 1]) {
        arr.splice(i + 1, 1);
      }
    }
  }

  #build(arr) {
    if (!arr.length) return null;

    const mid = Math.floor(arr.length / 2);
    const root = new BSTNode(arr[mid]);

    root.left = this.#build(arr.slice(0, mid));
    root.right = this.#build(arr.slice(mid + 1));

    return root;
  }

  insert(value) {
    this.root = this.#insertRec(value, this.root);
  }

  #insertRec(value, root) {
    if (!root) {
      return new BSTNode(value);
    }

    if (value < root.value) {
      root.left = this.#insertRec(value, root.left);
    }
    if (value > root.value) {
      root.right = this.#insertRec(value, root.right);
    }

    return root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BalancedBST(arr);
prettyPrint(tree.root);
