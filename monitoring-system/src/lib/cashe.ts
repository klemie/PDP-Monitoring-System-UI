interface ILocalStorageCache<T> {
    set(data: T): void;
    get(): T | null;
    remove(): void;
}

class LocalStorageCache<T> implements ILocalStorageCache<T> {
    private key: string;
    private serialize: (data: T) => string;
    private deserialize: (data: string) => T;

    constructor(
        key: string,
        serialize: (data: T) => string = JSON.stringify,
        deserialize: (data: string) => T = JSON.parse
    ) {
        this.key = key;
        this.serialize = serialize;
        this.deserialize = deserialize;
    }

    set(data: T): void {
        localStorage.setItem(this.key, this.serialize(data));
    }

    get(): T | null {
        const data = localStorage.getItem(this.key);
        return data ? this.deserialize(data) : null;
    }

    remove(): void {
        localStorage.removeItem(this.key);
    }
}

// Example usage
// // Usage example for an array of strings
// const stringArrayCache = new LocalStorageCache<string[]>('stringArrayCache');

// // Set an array of strings
// stringArrayCache.set(['item1', 'item2', 'item3']);

// // Get the array of strings
// const cachedStrings = stringArrayCache.get();
// console.log(cachedStrings); // Output: ['item1', 'item2', 'item3']

// // Remove the array of strings from cache
// stringArrayCache.remove();

export default LocalStorageCache;