import chai, {
  expect,
} from 'chai'
import sinon, {
  sandbox,
} from 'sinon'
import sinonChai from 'sinon-chai'

import findOne from 'modules/users/services/findOne'
import client from 'modules/users/client'
import userFixture from 'modules/users/fixtures/user'

chai.use(sinonChai)

describe('(Users) findOne ::', () => {
  let localSandbox
  let findOneByIdStub
  let findOneByEmailStub

  beforeEach(() => {
    localSandbox = sandbox.create()
    findOneByIdStub = localSandbox.stub(client, 'findOneById')
    findOneByEmailStub = localSandbox.stub(client, 'findOneByEmail')
  })

  afterEach(() => {
    localSandbox.restore()
  })

  it('should be a function', () => {
    expect(findOne).to.be.a('function')
  })

  it('should find one user with id', () => {
    findOneByIdStub.resolves(userFixture)

    return findOne({
      id: userFixture.id,
    })
      .then((result) => {
        sinon.assert.calledOnce(findOneByIdStub)
        expect(result).to.be.equal(userFixture)
      })
  })

  it('should find one user with email', () => {
    findOneByEmailStub.resolves(userFixture)

    return findOne({
      email: userFixture.email,
    })
      .then((result) => {
        sinon.assert.calledOnce(findOneByEmailStub)
        expect(result).to.be.equal(userFixture)
      })
  })

  it('throw if user not found', () => {
    findOneByIdStub.resolves(null)

    return findOne({
      id: userFixture.id,
    })
      .catch((error) => {
        expect(error).to.be.an('error')
      })
  })

  it('throw if no id or email', () => findOne({
    id: userFixture.id,
  })
    .catch((error) => {
      expect(error).to.be.an('error')
    }))
})
