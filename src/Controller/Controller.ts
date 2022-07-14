import { Item } from '../View/View'
import State from './State'
import Storage from './Storage'

export default class Controller {
  data: Item[]
  path: string
  products: Item[]
  state: State
  constructor() {
    this.state = new State()
    this.data = []
    this.products = []
    this.path = './data/db.json'
  }

  async init() {
    const response = await fetch(this.path)
    const result = await response.json()
    this.data = result
    this.products = result
    this.checkState()
  }

  checkState() {
    if(!Storage.getState()) {
      Storage.saveState(this.state)
    } else {
      const prev = Storage.getState()
      this.state = prev
      this.applyFilters()
    }
  }

  getItems(callback: (data: Item[]) => void) {
    callback(this.products)
  }

  getState(callback: (data: State) => void) {
    callback(this.state)
  }

  getAllItems(callback: (data: Item[]) => void) {
    callback(this.data)
  }

  filterByBrands(e: Event, callback: (data: Item[]) => void) {
    const brand = (e.target as HTMLInputElement).id
    const check = (e.target as HTMLInputElement).checked
    if(check) {
      if(!this.state.brands.includes(brand)) {
        this.state.brands.push(brand)
      }
    } else {
      this.state.brands = this.state.brands.filter(el => el !== brand)
    }
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  filterBySizes(e: Event, callback: (data: Item[]) => void) {
    const size = +(e.target as HTMLInputElement).id.slice(1)
    const check = (e.target as HTMLInputElement).checked
    if(check) {
      if(!this.state.sizes.includes(size)) {
        this.state.sizes.push(size)
      }
    } else {
      this.state.sizes = this.state.sizes.filter(el => el !== size)
    }
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  filterByColors(e: Event, callback: (data: Item[]) => void) {
    const elem = (e.target as Element).closest('.btn-color')
    let color = ''
    if(elem) {
      color = elem.classList[1]
    }
    const btn = (e.target as HTMLElement)
    btn.classList.toggle('active')
    const check = btn.classList.contains('active')
    if(check) {
      if(!this.state.colors.includes(color)) {
        this.state.colors.push(color)
      }
    } else {
      this.state.colors = this.state.colors.filter(el => el !== color)
    }
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  filterByPopular(e: Event, callback: (data: Item[]) => void) {
    const check = (e.target as HTMLInputElement).checked
    if(check) {
      this.state.popular = true
    } else {
      this.state.popular = false
    }
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  filterByQuantity(arr: (string | number)[], callback: (data: Item[]) => void) {
    const [min , max] = arr
    this.state.quantity = [Math.floor(+min), Math.floor(+max)]
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  getQuantity() {
    const min = Math.min(...this.data.map(el => el.quantity))
    const max = Math.max(...this.data.map(el => el.quantity))
    return [min,max]
  }

  getStateQuantity() {
    return this.state.quantity
  }

  filterByYears(arr: (string | number)[], callback: (data: Item[]) => void) {
    const [min , max] = arr
    this.state.years = [Math.floor(+min), Math.floor(+max)]
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  getYears() {
    const min = Math.min(...this.data.map(el => el.year))
    const max = Math.max(...this.data.map(el => el.year))
    return [min,max]
  }

  getStateYears() {
    return this.state.years
  }

  applyFilters() {
    this.products = [...this.data]
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      let del = true
      if(this.state.brands.length === 0) break
      this.state.brands.forEach(b => {
        if(item.brand === b) {
          del = false
        }
      })
      if(del) {
        this.products.splice(i, 1)
        i--
      }
    }
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      let del = true
      if(this.state.sizes.length === 0) break
      this.state.sizes.forEach(s => {
        if(item.size === s) {
          del = false
        }
      })
      if(del) {
        this.products.splice(i, 1)
        i--
      }
    }
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      let del = true
      if(this.state.colors.length === 0) break
      this.state.colors.forEach(c => {
        if(item.color === c) {
          del = false
        }
      })
      if(del) {
        this.products.splice(i, 1)
        i--
      }
    }
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      if(!this.state.popular) break
      if(!item.popular) {
        this.products.splice(i, 1)
        i--
      }
    }
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      if(this.state.years.length === 0) break
      if(item.year < this.state.years[0] || item.year > this.state.years[1]) {
        this.products.splice(i, 1)
        i--
      }
    }
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      if(this.state.quantity.length === 0) break
      if(item.quantity < this.state.quantity[0] || item.quantity > this.state.quantity[1]) {
        this.products.splice(i, 1)
        i--
      }
    }
  }

}