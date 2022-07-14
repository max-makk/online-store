import State from './State'

export default class Storage {

  static saveState(state: State) {
    localStorage.setItem('online-store-state', JSON.stringify(state))
  }

  static getState() {
    const result = localStorage.getItem('online-store-state')
    if(result) {
      return JSON.parse(result)
    }
  }

  static clearState() {
    localStorage.removeItem('online-store-state')
  }
}