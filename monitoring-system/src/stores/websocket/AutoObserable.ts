import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from 'mobx';

// This class is used to create an observable object that can be observed and unobserved
// Primary use is for websocket connections
class AutoObservable<T> {
  data: T | undefined;

  constructor(onObserved: () => void, onUnobserved: () => void) {
    makeAutoObservable(this);
    onBecomeObserved(this, 'data', onObserved);
    onBecomeUnobserved(this, 'data', onUnobserved);
  }
}

export default AutoObservable;