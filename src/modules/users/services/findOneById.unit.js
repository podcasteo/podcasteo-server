import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import findOneById from 'modules/users/services/findOneById'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(Users) findOneById ::', () => {
  let localSandbox
  let findOneByIdStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findOneByIdStub = localSandbox.stub(client, 'findOneById')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(findOneById).to.be.a('function')
  })

  it('should find one user', () => {
    findOneByIdStub.resolves(userFixture)

    return findOneById(userFixture.id)
      .then((result) => {
        sinon.assert.calledOnce(findOneByIdStub)
        expect(result).to.be.equal(userFixture)
      })
  })

  it('throw if user not found', () => {
    findOneByIdStub.resolves(null)

    return findOneById(userFixture.id)
      .catch((error) => {
        sinon.assert.calledOnce(findOneByIdStub)
        expect(error).to.be.an('error')
      })
  })
})
