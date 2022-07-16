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

  getCartItems(callback: (data: string[]) => void) {
    callback(this.state.cart)
  }

  getAllItems(callback: (data: Item[]) => void) {
    callback(this.data)
  }

  checkCartNumbers(e: Event, callback: (ifMore: boolean) => void) {
    const card = (e.target as Element).closest('.card')
    let name = ''
    if(card) {
      name = card.id
    }
    if(this.state.cart.length === 20 && !this.state.cart.includes(name)) {
      callback(true)
    } else {
      callback(false)
    }
  }

  addToCart(e: Event, callback: (data: string[]) => void) {
    const card = (e.target as Element).closest('.card')
    let name = ''
    if(card) {
      name = card.id
    }
    if(this.state.cart.includes(name)) {
      this.state.cart = this.state.cart.filter(el => el !== name)
    } else {
      if(this.state.cart.length === 20) {
        return
      }
      this.state.cart.push(name)
    }
    Storage.saveState(this.state)
    callback(this.state.cart)
  }

  filterByBrands(e: Event, callback: (data: Item[]) => void) {
    const brand = (e.target as HTMLInputElement).id
    const check = (e.target as HTMLInputElement).checked
    const str = brand.replace(/ /g, '')

    if(check) {
      if(!this.state.brands.includes(str)) {
        this.state.brands.push(str)
      }
    } else {
      this.state.brands = this.state.brands.filter(el => el !== str)
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

  sortItems(e: Event, callback: (data: Item[]) => void) {
    const type = (e.target as HTMLOptionElement)
    this.state.sorted = type.value
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  searchItems(e: Event, callback: (data: Item[]) => void) {
    const str = (e.target as HTMLInputElement).value
    this.state.search = str
    Storage.saveState(this.state)
    this.applyFilters()
    callback(this.products)
  }

  clearSearchState() {
    this.state.search = ''
    Storage.saveState(this.state)
    this.applyFilters()
  }

  resetFilters() {
    this.state.brands = []
    this.state.colors = []
    this.state.sizes = []
    this.state.quantity = []
    this.state.years = []
    this.state.popular = false
    this.state.search = ''
    Storage.saveState(this.state)
    this.applyFilters()
  }

  resetState() {
    this.state = new State()
    Storage.clearState()
    Storage.saveState(this.state)
    this.applyFilters()
  }

  applyFilters() {
    this.products = [...this.data]
    for(let i = 0; i < this.products.length; i++) {
      const item = this.products[i]
      let del = true
      if(this.state.brands.length === 0) break
      this.state.brands.forEach(b => {
        const str = item.brand.replace(/ /g, '')
        if(str === b) {
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
    if(this.state.sorted === 'name-A') {
      this.products = this.products.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    } else if(this.state.sorted === 'name-D') {
      this.products = this.products.sort((a, b) => {
        return a.name < b.name ? 1 : -1
      })
    }  else if(this.state.sorted === 'year-A') {
      this.products = this.products.sort((a, b) => {
        return a.year > b.year ? 1 : -1
      })
    } else if(this.state.sorted === 'year-D') {
      this.products = this.products.sort((a, b) => {
        return a.year < b.year ? 1 : -1
      })
    } else if(this.state.sorted === 'quantity-A') {
      this.products = this.products.sort((a, b) => {
        return a.quantity > b.quantity ? 1 : -1
      })
    } else if(this.state.sorted === 'quantity-D') {
      this.products = this.products.sort((a, b) => {
        return a.quantity < b.quantity ? 1 : -1
      })
    }
    this.products = this.products.filter(p => p.name.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
  }

}
