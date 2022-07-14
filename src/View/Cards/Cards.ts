import Card from '../Card/Card'
import { Item } from '../View'

export default class Cards {
  draw(data: Item[]) {
    const container = document.querySelector('.cards') as HTMLElement
    container.textContent = ''
    data.forEach(el => {
      const current = new Card()
      const card = current.create(el)
      container.append(card)
    })
  }
}