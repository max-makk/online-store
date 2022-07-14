import { Item } from '../View'

export default class Brands {

  brands: HTMLElement
  constructor() {
    this.brands = document.querySelector('.nav-brands') as HTMLElement
  }

  draw(data: Item[]) {
    const set = Array.from(new Set(data.map(el => el.brand)))
    set.forEach(el => {
      const label: HTMLLabelElement = document.createElement('label')
      const input: HTMLInputElement = document.createElement('input')
      input.classList.add('nav-brand')
      input.type = 'checkbox'
      const str = el.replace(/ /g, '')
      input.id = str

      label.textContent = el
      label.prepend(input)
      this.brands.append(label)
    })
  }


}