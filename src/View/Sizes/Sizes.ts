import { Item } from '../View'

export default class Sizes {

  sizes: HTMLElement
  constructor() {
    this.sizes = document.querySelector('.nav-sizes') as HTMLElement
  }

  draw(data: Item[]) {
    const set = Array.from(new Set(data.map(el => el.size)))
    set.forEach(el => {
      const label: HTMLLabelElement = document.createElement('label')
      const input: HTMLInputElement = document.createElement('input')
      const span: HTMLSpanElement = document.createElement('span')
      input.type = 'checkbox'
      input.id = 's' + String(el)

      span.textContent = String(el)

      label.append(input)
      label.append(span)
      this.sizes.append(label)
    })
  }

  // bindBrandsFilter(handler: (brand: string) => void) {
  //   this.brands.addEventListener('change', (e) => handler((e.target as HTMLElement).id))
  // }

}