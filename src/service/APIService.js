import api from './obfs_api'

/**
 * @typedef {Object} User
 * @property {string} type Type of change (added|modified|deleted)
 * @property {string} id
 * @property {object} data
 * @property {string} data.name
 * @property {array} data.friends
 */

/**
 * @typedef {Object} Message
 * @property {string} type Type of change (added|modified|deleted)
 * @property {string} id
 * @property {object} data
 * @property {string} data.to
 * @property {string} data.from
 * @property {string} data.message
 */

/**
 * UserCallback
 *
 * @callback userCallback
 * @param {User} user - The user change object
 */

/**
 * MessageCallback
 *
 * @callback messageCallback
 * @param {Message} message - The message change object
 */

export default {
  /** @function
   *  @param {string} name Your users's name
   */
  login: (name) => api.login(name),

  /** @function
   *  @param {userCallback} cb Callback that fires on changes
   */
  subscribeUsers: (cb) => api.subscribeUsers(cb),

  /** @function
   *  @param {string} friendId The user's id to add as a friend
   */
  addUsersAsFriend: (friendId) => api.addUsersAsFriend(friendId),

  /** @function
   *  @param {string} message The message that will be send
   */
  sendMessage: (message) => api.sendMessage('global', message),

  /** @function
   *  @param {string} to Id of the recieving end
   *  @param {string} message The message that will be send
   */
  sendMessageTo: (to, message) => api.sendMessage(to, message),

  /** @function
   *  @param {userCallback} cb Callback that fires on changes
   */
  subscribeMessages: (cb) => api.subscribeMessages(cb)
}
