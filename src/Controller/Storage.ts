import State from './State'

export default class Storage {

  static saveState(state: State): void {
    localStorage.setItem('online-store-state', JSON.stringify(state))
  }

  static checkPrevState(): true | false {
    const result = localStorage.getItem('online-store-state')
    if(result) {
      return true
    }
    return false
  }

  static getPrevState(): State {
    const result = localStorage.getItem('online-store-state') as string
    return JSON.parse(result)
  }

  static clearState(): void {
    localStorage.removeItem('online-store-state')
  }
}
