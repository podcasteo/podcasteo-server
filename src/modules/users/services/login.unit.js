import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import login from 'modules/users/services/login'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'
import loginFixture from 'modules/users/fixtures/login'

chai.use(sinonChai)

describe('(Users) login ::', () => {
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
    expect(login).to.be.a('function')
  })

  it('should login a user', () => {
    findOneByEmailStub.resolves(userFixture)

    return login(loginFixture)
      .then((result) => {
        sinon.assert.calledOnce(findOneByEmailStub)
        expect(result.token).to.be.a('String')
      })
  })

  it('should throw if user not found', () => {
    findOneByEmailStub.resolves(null)

    return login(loginFixture)
      .catch((error) => {
        sinon.assert.calledOnce(findOneByEmailStub)
        expect(error).to.be.an('error')
      })
  })

  it('should throw if password invalid', () => {
    findOneByEmailStub.resolves(userFixture)

    return login({
      email: 'vincent.kocupyr@gmail.com',
      password: 'fauxpassword',
    })
      .catch((error) => {
        sinon.assert.calledOnce(findOneByEmailStub)
        expect(error).to.be.an('error')
      })
  })
})
