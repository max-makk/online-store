import Cards from './Cards/Cards'
import Brands from './Brands/Brands'
import Sizes from './Sizes/Sizes'
import Colors from './Colors/Colors'
import State from '../Controller/State'

export interface Item {
  brand: string,
  color: string
  img: string
  name: string
  popular: boolean
  price: number
  quantity: number
  size: number
  year: number
}

export default class View {
  cards: Cards
  brands: Brands
  sizes: Sizes
  colors: Colors
  constructor() {
    this.cards = new Cards()
    this.brands = new Brands()
    this.sizes = new Sizes()
    this.colors = new Colors()
  }

  displayCards(data: Item[]): void {
    this.cards.draw(data)
  }

  displayBrands(data: Item[]) {
    this.brands.draw(data)
  }

  displaySizes(data: Item[]) {
    this.sizes.draw(data)
  }

  displayColors(data: Item[]) {
    this.colors.draw(data)
  }

  addRibbons(data: string[]) {
    this.clearCards()
    this.numberInCart(data.length)
    data.forEach(el => {
      const card = document.getElementById(`${el}`) as HTMLElement
      if(!card) return
      const div: HTMLElement = document.createElement('div')
      const span: HTMLElement = document.createElement('span')
      div.classList.add('ribbon')
      div.classList.add('ribbon-top-left')
      div.append(span)
      card.append(div)
    })
  }

  showWarning(ifMore: boolean) {
    const div = document.createElement('div') as HTMLElement
    div.classList.add('warning')
    div.textContent = 'you can add no more than 20 products'
    if(ifMore) {
      document.body.append(div)
    }
    setTimeout(() => {
      div.remove()
    }, 1500)
  }

  numberInCart(n: number) {
    const numberCart = document.querySelector('.number') as HTMLElement
    numberCart.textContent = String(n)
  }

  clearCards() {
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card')
    cards.forEach(el => {
      const div = el.lastChild as HTMLElement
      if(div.classList.contains('ribbon')) {
        div.remove()
      }
    })
  }

  showClearButton() {
    const search = document.querySelector('.search-icon')
    search?.classList.remove('search-visible')
    const btn = document.querySelector('.search-clear')
    btn?.classList.add('clear-visible')
  }

  hideClearButton() {
    const search = document.querySelector('.search-icon')
    search?.classList.add('search-visible')
    const btn = document.querySelector('.search-clear')
    btn?.classList.remove('clear-visible')
  }

  restoreView(data: State) {
    data.brands.forEach(el => {
      const str = el.replace(/ /g, '')
      const brand = document.querySelector(`.nav-brands #${str}`) as HTMLInputElement
      brand.checked = true
    })
    data.sizes.forEach(el => {
      const size = document.querySelector(`.nav-sizes #s${el}`) as HTMLInputElement
      size.checked = true
    })
    data.colors.forEach(el => {
      const color = document.querySelector(`.nav-colors .${el}`) as HTMLInputElement
      color.classList.add('active')
    })
    const popular = document.querySelector('.popular') as HTMLInputElement
    popular.checked = data.popular
    const option = document.querySelector(`.sort [value='${data.sorted}']`) as HTMLOptionElement
    option.selected = true
    const search = document.getElementById('search') as HTMLInputElement
    search.value = data.search
    if(data.search !== '') {
      this.showClearButton()
    } else {
      this.hideClearButton()
    }
  }

  removeChecked() {
    const brands = document.querySelector('.nav-brands') as HTMLElement
    Array.from(brands.children).forEach(el => {
      (el.firstChild as HTMLInputElement).checked = false
    })
    const sizes = document.querySelector('.nav-sizes') as HTMLElement
    Array.from(sizes.children).forEach(el => {
      (el.firstChild as HTMLInputElement).checked = false
    })
    const colors = document.querySelector('.nav-colors') as HTMLElement
    Array.from(colors.children).forEach(el => {
      (el as HTMLElement).classList.remove('active')
    })
    const popular = document.querySelector('.popular') as HTMLInputElement
    popular.checked = false
  }

}
