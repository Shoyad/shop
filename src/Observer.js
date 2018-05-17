class Observer {

  constructor() {
    this.observers = []
  }

  on(fn) {
    this.observers.push(fn)
  }

  off(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn)
  }

  emit(data) {
    this.observers.forEach(subscribe => subscribe(data))
  }
}


module.exports = { Observer }