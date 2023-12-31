class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
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

  levelOrder(cb) {
    return this.#levelOrder(cb, [this.root], [this.root.value]);
  }

  #levelOrder(cb, queue, arr) {
    if (!queue.length) return arr;

    const root = queue.shift();

    if (root.left) {
      queue.push(root.left);
      arr.push(root.left.value);
    }
    if (root.right) {
      queue.push(root.right);
      arr.push(root.right.value);
    }

    if (cb) cb(root);

    return this.#levelOrder(cb, queue, arr);
  }

  inOrder(cb) {
    return this.#inOrder(cb, [this.root], []);
  }

  #inOrder(cb, stack, arr) {
    const root = stack[stack.length - 1];

    if (root.left) {
      stack.push(root.left);
      this.#inOrder(cb, stack, arr);
    }

    stack.pop();
    arr.push(root.value);
    if (cb) cb(root);

    if (root.right) {
      stack.push(root.right);
      this.#inOrder(cb, stack, arr);
    }

    return arr;
  }

  preOrder(cb) {
    return this.#preOrder(cb, [this.root], []);
  }

  #preOrder(cb, stack, arr) {
    const root = stack[stack.length - 1];

    arr.push(root.value);
    if (cb) cb(root);

    if (root.left) {
      stack.push(root.left);
      this.#preOrder(cb, stack, arr);
    }

    stack.pop();

    if (root.right) {
      stack.push(root.right);
      this.#preOrder(cb, stack, arr);
    }

    return arr;
  }

  postOrder(cb) {
    return this.#postOrder(cb, [this.root], []);
  }

  #postOrder(cb, stack, arr) {
    const root = stack[stack.length - 1];

    if (root.left) {
      stack.push(root.left);
      this.#postOrder(cb, stack, arr);
    }

    if (root.right) {
      stack.push(root.right);
      this.#postOrder(cb, stack, arr);
    }

    arr.push(root.value);
    if (cb) cb(root);
    stack.pop();

    return arr;
  }

  height(node) {
    if (!node) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (leftHeight > rightHeight) return leftHeight + 1;
    return rightHeight + 1;
  }

  depth(node) {
    if (!node) return -1;
    return this.height(this.root) - this.height(node);
  }

  isBalanced() {
    return this.#isBalanced(this.root);
  }

  #isBalanced(root) {
    if (!root) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.#isBalanced(root.left) &&
      this.#isBalanced(root.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    const arr = this.inOrder();
    this.#normalize(arr);
    this.root = this.#build(arr);
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

// Driver script
(() => {
  const arr = (() => {
    const limit = 100;
    const arr = [];
    const rand = () => Math.floor(Math.random() * limit);

    for (let i = 0; i < rand(); i++) {
      arr.push(rand());
    }

    return arr;
  })();

  const tree = new BST(arr);

  prettyPrint(tree.root);

  console.log("Tree is balanced: " + tree.isBalanced());

  console.log("\nLevel order:");
  tree.levelOrder((node) => console.log(node.value));

  console.log("\nIn order:");
  tree.inOrder((node) => console.log(node.value));

  console.log("\nPre order:");
  tree.preOrder((node) => console.log(node.value));

  console.log("\nPost order:");
  tree.postOrder((node) => console.log(node.value));

  tree.insert(9000);
  tree.insert(420);
  tree.insert(1337);
  tree.insert(228);

  console.log();
  prettyPrint(tree.root);

  console.log("\nTree is balanced: " + tree.isBalanced());

  tree.rebalance();

  console.log();
  prettyPrint(tree.root);

  console.log("\nTree is balanced: " + tree.isBalanced());

  console.log("\nLevel order:");
  tree.levelOrder((node) => console.log(node.value));

  console.log("\nIn order:");
  tree.inOrder((node) => console.log(node.value));

  console.log("\nPre order:");
  tree.preOrder((node) => console.log(node.value));

  console.log("\nPost order:");
  tree.postOrder((node) => console.log(node.value));
})();
