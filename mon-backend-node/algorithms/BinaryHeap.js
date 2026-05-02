/**
 * Tas Binaire (Binary Heap) - Max Heap
 * Structure de donnees pour gerer la file de priorite des demandes d'energie.
 * 
 * Complexites :
 * - getMax() : O(1)
 * - insert() : O(log n)
 * - extractMax() : O(log n)
 * 
 * Contrainte 2035 : Beaucoup plus efficace qu'une liste triee, 
 * economise la batterie du telephone lors du traitement des demandes.
 */
class BinaryHeap {
    constructor(compareFn = (a, b) => a.priorite - b.priorite) {
        this.heap = [];
        this.compare = compareFn;
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        let current = index;
        while (current > 0) {
            const parent = this.getParentIndex(current);
            if (this.compare(this.heap[current], this.heap[parent]) > 0) {
                this.swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }

    getMax() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(index) {
        let current = index;
        const length = this.heap.length;

        while (true) {
            let largest = current;
            const left = this.getLeftChildIndex(current);
            const right = this.getRightChildIndex(current);

            if (left < length && this.compare(this.heap[left], this.heap[largest]) > 0) {
                largest = left;
            }
            if (right < length && this.compare(this.heap[right], this.heap[largest]) > 0) {
                largest = right;
            }
            if (largest !== current) {
                this.swap(current, largest);
                current = largest;
            } else {
                break;
            }
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    toArray() {
        return [...this.heap];
    }
}

module.exports = BinaryHeap;
