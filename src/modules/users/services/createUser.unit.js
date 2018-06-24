import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import createUser from 'modules/users/services/createUser'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'
import signupFixture from 'modules/users/fixtures/signup'

chai.use(sinonChai)

describe('(Users) createUser ::', () => {
  let localSandbox
  let createStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    createStub = localSandbox.stub(client, 'createUser')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(createUser).to.be.a('function')
  })

  it('should create user', () => {
    createStub.resolves(userFixture)

    return createUser(signupFixture)
      .then((result) => {
        sinon.assert.calledOnce(createStub)
        expect(result).to.have.all.keys('token')
      })
  })
})
