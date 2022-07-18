import State from '../Controller/State'
import Storage from '../Controller/Storage'
import Card from '../View/Card/Card'
import Controller from '../Controller/Controller'

describe('Controller test', () => {
  const fakeData = [{
    'name': 'test',
    'year': 1,
    'quantity': 1,
    'brand': 'test',
    'color': 'test',
    'size': 1,
    'popular': true,
    'price': 1,
    'img': 'test'
  }, {
    'name': 'test',
    'year': 100,
    'quantity': 100,
    'brand': 'test',
    'color': 'test',
    'size': 100,
    'popular': true,
    'price': 100,
    'img': 'test'
  }]
  
  test('getYears function returns correct minimum and maximum values', () => {
    const controller = new Controller()
    controller.data = fakeData
    expect(controller.getYears()).toEqual([1, 100])
  })
})

describe('State test', () => {
  test('by default, the state contains sorting by name in ascending order', () => {
    const state = new State()
    expect(state.sorted).toBe('name-A')
  })
})

describe('Storage test', () => {
  test('state does not exist after clear', () => {
    Storage.clearState()
    const result = Storage.checkPrevState()
    expect(result).toBeFalsy()
  })
})

describe('Card test', () => {
  const card = new Card()
  const data = {
    brand: 'test',
    color: 'test',
    img: 'test',
    name: 'test',
    popular: true,
    price: 666,
    quantity: 666,
    size: 666,
    year: 666,
  }
  test('Card class return HTMLDivElement', () => {
    const result = card.draw(data)
    expect(result).toBeInstanceOf(HTMLDivElement)
  })
  test('Card contains the corresponding price', () => {
    const result = card.draw(data)
    expect(result.querySelector('.card-price')?.textContent).toMatch('666')
  })
})
