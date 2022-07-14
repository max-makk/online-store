import View, { Item } from '../View/View'
import Controller from '../Controller/Controller'
import State from '../Controller/State'
import YearsSlider from '../View/Years/Years'
import QuantitySlider from '../View/Quantity/Quantity'

export default class App {
  controller: Controller
  view: View
  constructor() {
    this.controller = new Controller()
    this.view = new View()
  }

  async run() {
    await this.controller.init()
    this.showItems()
  }

  showItems() {
    this.controller.getItems((data: Item[]) => this.view.displayCards(data))
    this.controller.getAllItems((data: Item[]) => this.view.displayBrands(data))
    this.controller.getAllItems((data: Item[]) => this.view.displaySizes(data))
    this.controller.getAllItems((data: Item[]) => this.view.displayColors(data))
    this.controller.getState((data: State) => this.view.restoreView(data))
    this.listenBrands()
    this.listenColors()
    this.listenSizes()
    this.listenPopular()
    this.listenYears()
    this.listenQuantity()
    this.listenSort()
    this.listenCards()
    this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
  }

  listenBrands() {
    document.querySelector('.nav-brands')?.addEventListener('change', (e) => {
      this.controller.filterByBrands(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  listenSizes() {
    document.querySelector('.nav-sizes')?.addEventListener('change', (e) => {
      this.controller.filterBySizes(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  listenColors() {
    document.querySelector('.nav-colors')?.addEventListener('click', (e) => {
      if(!(e.target as HTMLElement).closest('.btn-color')) return
      if((e.target as HTMLElement).classList.contains('btn-border')) return
      this.controller.filterByColors(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })

  }

  listenPopular() {
    document.querySelector('.popular')?.addEventListener('change', (e) => {
      this.controller.filterByPopular(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }
  listenQuantity() {
    const [min, max] = this.controller.getQuantity()
    const [currentMin, currentMax] = this.controller.getStateQuantity()
    const div = document.querySelector('.quantity-slider') as HTMLElement
    const quantity = QuantitySlider.create(div, {
      start: [currentMin || min, currentMax || max],
      connect: true,
      tooltips: {
        to: function(n) {
          return Math.floor(n)
        }
      },
      step: 1,
      range: {
        'min': [min],
        'max': [max]
      }
    })
    quantity.on('update', (v) => {
      this.controller.filterByQuantity(v, (data: Item[]) => this.view.displayCards(data))
    })
    this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
  }

  listenYears() {
    const [min, max] = this.controller.getYears()
    const [currentMin, currentMax] = this.controller.getStateYears()
    const div = document.querySelector('.years-slider') as HTMLElement
    const years = YearsSlider.create(div, {
      start: [currentMin || min, currentMax || max],
      connect: true,
      tooltips: {
        to: function(n) {
          return Math.floor(n)
        }
      },
      step: 1,
      range: {
        'min': [min],
        'max': [max]
      }
    })
    years.on('update', (v) => {
      this.controller.filterByYears(v, (data: Item[]) => this.view.displayCards(data))
    })
    this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
  }

  listenSort() {
    document.querySelector('.sort')?.addEventListener('change', (e) => {
      this.controller.sortItems(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  listenCards() {
    document.querySelector('.cards')?.addEventListener('click', (e) => {
      const card = (e.target as Element).closest('.card')
      if(!card) return
      this.controller.addToCart(e, (data: string[]) => this.view.addRibbons(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }
}
