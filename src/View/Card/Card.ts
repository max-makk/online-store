import { Item } from '../View'

export default class Card {
  create(data: Item) {
    const card: HTMLElement = document.createElement('div')
    const img: HTMLImageElement = document.createElement('img')
    const brand: HTMLElement = document.createElement('div')
    const name: HTMLElement = document.createElement('div')
    const price: HTMLElement = document.createElement('div')

    card.classList.add('card')
    card.classList.add('border-dark')
    card.classList.add('rounded-0')


    const str = data.name.replace(/ /g, '')
    card.id = str

    img.classList.add('img-fluid')
    img.classList.add('mx-auto')

    brand.classList.add('card-brand')

    name.classList.add('card-name')

    price.classList.add('card-price')

    img.src = data.img
    img.alt = data.name
    brand.textContent = data.brand
    name.textContent = `${data.name} ${data.size}" ${data.color} ${data.year} (${data.quantity})`
    if(data.popular) {
      price.textContent = `$${data.price} Popular`
    } else {
      price.textContent = `$${data.price}`
    }

    card.append(img)
    card.append(brand)
    card.append(name)
    card.append(price)
    return card
  }
}