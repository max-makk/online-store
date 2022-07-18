export default class State {
  cart: string[]
  brands: string[]
  sizes: number[]
  colors: string[]
  years: number[]
  quantity: number[]
  search: string
  popular: boolean
  sorted: string
  constructor() {
    this.sorted = 'name-A'
    this.cart = []
    this.brands = []
    this.sizes = []
    this.colors = []
    this.years = []
    this.quantity = []
    this.search = ''
    this.popular = false
  }
}
