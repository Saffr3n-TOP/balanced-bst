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

  delete(value) {
    this.root = this.#deleteRec(value, this.root);
  }

  #deleteRec(value, root) {
    if (!root) {
      return null;
    }

    if (value < root.value) {
      root.left = this.#deleteRec(value, root.left);
      return root;
    }
    if (value > root.value) {
      root.right = this.#deleteRec(value, root.right);
      return root;
    }

    if (!root.left) {
      return root.right;
    }
    if (!root.right) {
      return root.left;
    }

    let successorParent = root;
    let successor = root.right;

    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }

    if (successorParent !== root) {
      successorParent.left = null;
    } else {
      successorParent.right = null;
    }

    successor.left = root.left;
    successor.right = root.right;

    return successor;
  }

  find(value) {
    return this.#find(value, this.root);
  }

  #find(value, root) {
    if (!root) {
      return null;
    }
    if (value === root.value) {
      return root;
    }
    if (value < root.value) {
      return this.#find(value, root.left);
    }
    if (value > root.value) {
      return this.#find(value, root.right);
    }
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
