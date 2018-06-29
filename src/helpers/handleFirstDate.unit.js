import chai, {
  expect,
} from 'chai'
import sinonChai from 'sinon-chai'

import handleFirstDate from 'helpers/handleFirstDate'
import errMiddleware from 'helpers/errors'

chai.use(sinonChai)

describe('(helpers) handleFirstDate ::', () => {
  it('should be a function', () => {
    expect(handleFirstDate).to.be.a('function')
  })

  it('should return first day of month with format', () => {
    const date = '04/14/2004'
    const result = handleFirstDate(date)

    expect(result).to.eq('2004-04-01T00:00:00.000Z')
  })

  it('should return first day of month with iso', () => {
    const date = '2023-10-10'
    const result = handleFirstDate(date)

    expect(result).to.eq('2023-10-01T00:00:00.000Z')
  })

  it('should throw if invalid date', async (done) => {
    try {
      handleFirstDate('2023/30/30')

      done(new Error())
    } catch (error) {
      expect(error.status).to.eq(errMiddleware.badRequest().status)

      done()
    }
  })
})
