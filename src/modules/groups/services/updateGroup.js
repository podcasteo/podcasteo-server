import joi from 'joi'

// import membersClient from 'modules/members/client'
import groupsClient from 'modules/groups/client'

export default async function updateGroup(groupId, data, user) {
  await joi.validate(groupId, joi.string().required(), 'groupId')
  await joi.validate(data, joi.object(), 'data')
  await joi.validate(user, joi.object(), 'data')

  const member = true // await membersClient.findById(user.id, groupId)

  if (member.role !== 'ADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  await groupsClient.updateGroup(groupId, data)

  return groupsClient.findOneById(groupId)
}
