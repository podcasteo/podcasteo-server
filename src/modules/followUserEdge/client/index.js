import createFollowUser from 'modules/followUserEdge/client/createFollowUser'
import deleteFollowUser from 'modules/followUserEdge/client/deleteFollowUser'
import deleteFollowUserByEdge from 'modules/followUserEdge/client/deleteFollowUserByEdge'
import deleteFollowUserByUser from 'modules/followUserEdge/client/deleteFollowUserByUser'
import findByFollower from 'modules/followUserEdge/client/findByFollower'
import findByFollowing from 'modules/followUserEdge/client/findByFollowing'
import findOneById from 'modules/followUserEdge/client/findOneById'
import findOneByEdge from 'modules/followUserEdge/client/findOneByEdge'

export default {
  createFollowUser,
  deleteFollowUser,
  deleteFollowUserByEdge,
  deleteFollowUserByUser,
  findByFollower,
  findByFollowing,
  findOneByEdge,
  findOneById,
}
