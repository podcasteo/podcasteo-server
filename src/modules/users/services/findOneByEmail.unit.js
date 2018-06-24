import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import findOneByEmail from 'modules/users/services/findOneByEmail'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(Users) findOneByEmail ::', () => {
  let localSandbox
  let findOneByEmailStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findOneByEmailStub = localSandbox.stub(client, 'findOneByEmail')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(findOneByEmail).to.be.a('function')
  })

  it('should find one user', () => {
    findOneByEmailStub.resolves(userFixture)

    return findOneByEmail(userFixture.email)
      .then((result) => {
        sinon.assert.calledOnce(findOneByEmailStub)
        expect(result).to.be.equal(userFixture)
      })
  })

  it('throw if user not found', () => {
    findOneByEmailStub.resolves(null)

    return findOneByEmail(userFixture.email)
      .catch((error) => {
        sinon.assert.calledOnce(findOneByEmailStub)
        expect(error).to.be.an('error')
      })
  })
})
