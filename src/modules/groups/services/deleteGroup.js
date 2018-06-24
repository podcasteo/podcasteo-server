import joi from 'joi'

// import membersClient from 'modules/members/client'
import groupsClient from 'modules/groups/client'

export default async function updateGroup(groupId, user) {
  await joi.validate(groupId, joi.string().required(), 'groupId')
  await joi.validate(user, joi.object(), 'data')

  const member = true // await membersClient.findById(user.id, groupId)

  if (member.role !== 'ADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  // delete everythings memberEdge - likeEdge - podcastEdge - group

  return groupsClient.findOneById(groupId)
}
