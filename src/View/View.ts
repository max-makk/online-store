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
    console.log('hiiiii')
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
  }
}