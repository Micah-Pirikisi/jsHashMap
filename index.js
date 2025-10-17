class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // check if key already exists in the bucket
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // otherwise, insert a new pair
    bucket.push([key, value]);
    this.size++;

    // resize if load factor exceeded
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  getItem(key) {
    let index = this.hash(key);

    for (let [k, v] of this.buckets[index]) {
      if (k === key) {
        return v;
      }
    }
    return undefined;
  }

  has(key) {
    let index = this.hash(key);

    for (let [k, v] of this.buckets[index]) {
      if (k === key) {
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    let hashKeys = [];

    for (let bucket of this.buckets) {
      for (let [k, v] of bucket) {
        hashKeys.push(k);
      }
    }
    return hashKeys;
  }

  values() {
    let val = [];

    for (let bucket of this.buckets) {
      for (let [k, v] of bucket) {
        val.push(v);
      }
    }
    return val;
  }

  entries() {
    let pairs = []; 

    for (let bucket of this.buckets) {
      for (let [k, v] of bucket) {
        pairs.push([k, v]);
      }
    }
    return pairs;
  }
}
