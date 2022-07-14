import { Item } from '../View'

export default class Colors {
  draw(data: Item[]) {
    const colors = document.querySelector('.nav-colors') as HTMLElement
    const set = Array.from(new Set(data.map(el => el.color)))
    set.forEach(el => {
      const button: HTMLButtonElement = document.createElement('button')
      const span: HTMLSpanElement = document.createElement('span')

      button.classList.add('btn-color')
      button.classList.add(el)

      span.classList.add('btn-border')

      button.append(span)

      colors.append(button)

    })
  }
}