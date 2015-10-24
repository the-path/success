import assign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let storeFactory = {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  onChange(callback) {
    this.addChangeListener(callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
};

export default function(attributes) {
  return assign({}, EventEmitter.prototype, storeFactory, attributes);
}
