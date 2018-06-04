import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import findById from 'modules/users/services/findById'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(User) findById ::', () => {
  let localSandbox
  let findByIdStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findByIdStub = localSandbox.stub(client, 'findById')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(findById).to.be.a('function')
  })

  it('should find one user', () => {
    findByIdStub.resolves(userFixture)

    return findById(userFixture.id)
      .then((result) => {
        sinon.assert.calledOnce(findByIdStub)
        expect(result).to.be.equal(userFixture)
      })
  })

  it('throw if user not found', () => {
    findByIdStub.resolves(null)

    return findById(userFixture.id)
      .catch((error) => {
        sinon.assert.calledOnce(findByIdStub)
        expect(error).to.be.an('error')
      })
  })
})
