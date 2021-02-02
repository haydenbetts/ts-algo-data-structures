/**
 * A partial implementation of Java's PriorityQueue data structure
 * Currently only implemented for numbers
 * https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html
 */
export class PriorityQueue {
  _items: number[];

  constructor(
    items: number[],
    // default comparator, returns max heap
    // If compareFunction(a, b) returns less than 0, sort a to an index lower than b (i.e. a comes first).
    private _comparator: (a: number, b: number) => number = (a, b) => b - a
  ) {
    this._items = [];
    this.addAll(items);
  }

  private getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1;
  }

  private getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2;
  }

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this._items.length;
  }

  private hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this._items.length;
  }

  private hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index: number) {
    return this._items[this.getLeftChildIndex(index)];
  }

  private rightChild(index: number) {
    return this._items[this.getRightChildIndex(index)];
  }

  private parent(index: number) {
    return this._items[this.getParentIndex(index)];
  }

  private retrieve(index: number) {
    return this._items[index];
  }

  private swap(i: number, j: number) {
    const tmp = this._items[j];
    this._items[j] = this._items[i];
    this._items[i] = tmp;
  }

  private heapifyDown() {
    let curr = 0;
    while (this.hasLeftChild(curr)) {
      let sortedChildIndex = this.getLeftChildIndex(curr);
      if (
        this.getRightChildIndex(curr) &&
        // if right should be moved up in queue relative to left
        this.comparator(this.rightChild(curr), this.leftChild(curr)) < 0
      ) {
        sortedChildIndex = this.getRightChildIndex(curr);
      }

      if (
        // if larger child should be moved up in queue relative to parent
        this.comparator(this.retrieve(sortedChildIndex), this.retrieve(curr)) <
        0
      ) {
        this.swap(sortedChildIndex, curr);
        curr = sortedChildIndex;
      } else {
        break;
      }
    }
  }

  private heapifyUp() {
    let curr = this._items.length - 1;

    while (
      this.hasParent(curr) &&
      // if element should be moved up in queue relative to parent
      this.comparator(this.retrieve(curr), this.parent(curr)) < 0
    ) {
      this.swap(curr, this.getParentIndex(curr));
      curr = this.getParentIndex(curr);
    }
  }

  /*
    Retrieves and removes the head of this queue, or returns null if this queue is empty.
  */
  poll() {
    if (!this._items.length) throw new Error(`Invalid Queue Length`);
    const item = this._items[0];
    this._items[0] = this._items[this._items.length - 1];
    this.heapifyDown();
    return item;
  }

  /*
    Returns the comparator used to order the elements in this queue, 
    or null if this queue is sorted according to the natural ordering of its elements.
  */
  get comparator() {
    return this._comparator;
  }

  /*
    Return raw state of heap for testing
  */
  get items() {
    return this._items;
  }

  /*
    Returns the number of elements in this collection.
  */
  size() {}

  /*
    Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  */
  peek() {
    return this._items.length ? this._items[0] : null;
  }

  /*
    Inserts the specified element into this priority queue.
  */
  add(elt: number) {
    this._items[this._items.length] = elt;
    this.heapifyUp();
  }

  /*
  Removes a single instance of the specified element from this queue, if it is present. More formally, removes an element e such that o.equals(e), 
  if this queue contains one or more such elements. Returns true if and only if this queue contained the specified element (or equivalently, if this queue changed as a result of the call).
  */
  remove(elt: number) {}

  /*
    This implementation iterates over the specified collection, and adds each element returned by the iterator to this queue, in turn. 
    A runtime exception encountered while trying to add an element (including, in particular, a null element) may result in only some of the elements 
    having been successfully added when the associated exception is thrown.
  */
  addAll(elts: number[]): boolean {
    let type = typeof elts[0];

    for (let i = 0; i < elts.length; i++) {
      if (typeof elts[i] !== type) return false;
      this.add(elts[i]);
    }

    return true;
  }
}
