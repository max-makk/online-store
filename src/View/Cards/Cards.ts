import Card from '../Card/Card'
import { Item } from '../View'

export default class Cards {
  draw(data: Item[]) {
    const container = document.querySelector('.cards') as HTMLElement
    container.textContent = ''
    if(data.length === 0) {
      const notify: HTMLDivElement = document.createElement('div')
      notify.classList.add('notify')
      notify.textContent = 'no products found'
      container.append(notify)
    }
    data.forEach(el => {
      const current = new Card()
      const card = current.create(el)
      container.append(card)
    })
  }
}