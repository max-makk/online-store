import View, { Item } from '../View/View'
import Controller from '../Controller/Controller'
import State from '../Controller/State'
import * as noUiSlider from 'nouislider'

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
    this.addBrandsListener()
    this.addColorsListener()
    this.addSizesListener()
    this.addPopularListener()
    this.addYearsListener()
    this.addQuantityListener()
    this.addSortListener()
    this.addCardsListener()
    this.addSearchListener()
    this.addResetFilterListener()
    this.addResetSettingsListener()
    this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
  }

  addBrandsListener() {
    document.querySelector('.nav-brands')?.addEventListener('change', (e) => {
      this.controller.filterByBrands(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addSizesListener() {
    document.querySelector('.nav-sizes')?.addEventListener('change', (e) => {
      this.controller.filterBySizes(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addColorsListener() {
    document.querySelector('.nav-colors')?.addEventListener('click', (e) => {
      if(!(e.target as HTMLElement).closest('.btn-color')) return
      if((e.target as HTMLElement).classList.contains('btn-border')) return
      this.controller.filterByColors(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addPopularListener() {
    document.querySelector('.popular')?.addEventListener('change', (e) => {
      this.controller.filterByPopular(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addQuantityListener() {
    const [min, max] = this.controller.getQuantity()
    const [currentMin, currentMax] = this.controller.getStateQuantity()
    const prev = document.querySelector('.quantity-slider') as HTMLElement
    const parent = prev.parentElement
    parent?.firstElementChild?.remove()
    const div = document.createElement('div')
    div.classList.add('quantity-slider')
    parent?.append(div)
    const quantity = noUiSlider.create(div, {
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
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addYearsListener() {
    const [min, max] = this.controller.getYears()
    const [currentMin, currentMax] = this.controller.getStateYears()
    const prev = document.querySelector('.years-slider') as HTMLElement
    const parent = prev.parentElement
    parent?.firstElementChild?.remove()
    const div = document.createElement('div')
    div.classList.add('years-slider')
    parent?.append(div)
    const years = noUiSlider.create(div, {
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
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addSortListener() {
    document.querySelector('.sort')?.addEventListener('change', (e) => {
      this.controller.sortItems(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addCardsListener() {
    document.querySelector('.cards')?.addEventListener('click', (e) => {
      const card = (e.target as Element).closest('.card')
      if(!card) return
      this.controller.checkCartNumbers(e ,(ifMore: boolean) => this.view.showWarning(ifMore))
      this.controller.addToCart(e, (data: string[]) => this.view.addRibbons(data))
    })
  }
  
  addSearchListener() {
    document.getElementById('search')?.focus()
    document.getElementById('search')?.addEventListener('input', (e) => {
      this.controller.searchItems(e, (data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
      const result = (e.target as HTMLInputElement)
      if(result.value !== '') {
        this.view.showClearButton()
      } else {
        this.view.hideClearButton()
      }
    })
    const clearButton = document.querySelector('.search-clear') as HTMLButtonElement
    clearButton.addEventListener('click', () => {
      const input = document.getElementById('search') as HTMLInputElement
      input.value = ''
      this.view.hideClearButton()
      this.controller.clearSearchState()
      this.controller.getItems((data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addResetFilterListener() {
    const button = document.querySelector('.reset-filter') as HTMLButtonElement
    const search = document.getElementById('search') as HTMLInputElement
    button.addEventListener('click', () => {
      this.controller.resetFilters()
      this.view.removeChecked()
      this.addYearsListener()
      this.addQuantityListener()
      search.value = ''
      this.view.hideClearButton()
      this.controller.getItems((data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }

  addResetSettingsListener() {
    const button = document.querySelector('.reset-settings') as HTMLButtonElement
    const search = document.getElementById('search') as HTMLInputElement
    button.addEventListener('click', () => {
      const option = document.querySelector('.sort [value="name-A"]') as HTMLOptionElement
      option.selected = true
      this.controller.resetState()
      this.controller.resetFilters()
      this.view.removeChecked()
      this.addYearsListener()
      this.addQuantityListener()
      search.value = ''
      this.view.hideClearButton()
      this.controller.getItems((data: Item[]) => this.view.displayCards(data))
      this.controller.getCartItems((data: string[]) => this.view.addRibbons(data))
    })
  }
}
