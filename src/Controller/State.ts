export default class State {
  cart: string[]
  brands: string[]
  names: string[]
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
    this.names = []
    this.sizes = []
    this.colors = []
    this.years = []
    this.quantity = []
    this.search = ''
    this.popular = false
  }
}