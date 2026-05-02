/**
 * Table de Hachage (Hash Table)
 * Acces rapide aux profils des foyers et utilisateurs.
 * 
 * Complexite :
 * - get/set/delete : O(1) amorti
 * 
 * Contrainte 2035 : Structure compacte pour gerer 
 * des milliers de foyers sans ralentir l'application.
 */
class HashTable {
    constructor(size = 101) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
        this.count = 0;
    }

    _hash(key) {
        let hash = 0;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) % this.size;
        }
        return hash;
    }

    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        
        bucket.push([key, value]);
        this.count++;
    }

    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    delete(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }
        return false;
    }

    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.buckets) {
            for (const [, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    getCount() {
        return this.count;
    }
}

module.exports = HashTable;
