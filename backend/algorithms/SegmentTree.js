/**
 * Arbre de Segment (Segment Tree)
 * Calcul efficace des consommations sur des plages horaires.
 * 
 * Complexites :
 * - build : O(n)
 * - query(l, r) : O(log n)
 * - update(index, value) : O(log n)
 * 
 * Contrainte 2035 : Utile pour faire des rapports rapides 
 * sur l'etat de la batterie sans faire ramer l'ordinateur du village.
 */
class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(0);
        if (this.n > 0) {
            this.build(arr, 0, 0, this.n - 1);
        }
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            return;
        }
        const mid = Math.floor((start + end) / 2);
        this.build(arr, 2 * node + 1, start, mid);
        this.build(arr, 2 * node + 2, mid + 1, end);
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    query(node, start, end, l, r) {
        if (r < start || l > end) return 0;
        if (l <= start && end <= r) return this.tree[node];
        
        const mid = Math.floor((start + end) / 2);
        const leftSum = this.query(2 * node + 1, start, mid, l, r);
        const rightSum = this.query(2 * node + 2, mid + 1, end, l, r);
        return leftSum + rightSum;
    }

    rangeQuery(l, r) {
        if (this.n === 0) return 0;
        return this.query(0, 0, this.n - 1, l, r);
    }

    update(node, start, end, idx, value) {
        if (start === end) {
            this.tree[node] = value;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        if (idx <= mid) {
            this.update(2 * node + 1, start, mid, idx, value);
        } else {
            this.update(2 * node + 2, mid + 1, end, idx, value);
        }
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    pointUpdate(idx, value) {
        if (this.n === 0) return;
        this.update(0, 0, this.n - 1, idx, value);
    }
}

module.exports = SegmentTree;
