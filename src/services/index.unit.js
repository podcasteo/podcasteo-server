import {
  expect,
} from 'chai'

import services from 'services'

describe('> services:index', () => {
  it('should export a Router', () => {
    expect(services).to.be.a('function')
  })
})
