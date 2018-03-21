<template>
  <div>
    <q-card class="bg-white shadow-2">
      <q-list link v-if="allUsers">
        <q-list-header>Online ({{allUsers.length}})
          <q-icon name="fiber_manual_record" color="green"></q-icon>
        </q-list-header>
        <q-item-separator></q-item-separator>
        <q-item v-for="(user, index) in allUsers" :key="index" @click.native="addFriend(user.id)">
          <q-item-side icon="person"></q-item-side>
          <q-item-main :label="user.data.name"></q-item-main>
          <q-tooltip>Add as friend</q-tooltip>
        </q-item>

        <q-list-header>Vrienden ({{myFriends.length}})</q-list-header>
        <q-item-separator></q-item-separator>
        <q-item v-for="friend in myFriends" :key="friend">
          <q-item-side icon="person"></q-item-side>
          <q-item-main :label="getFriendName(friend)"></q-item-main>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
export default {
  computed: {
    // TODO: call the getter of the store of the user module 'getFriends'. This getter returns your friends. If you have no friends,
    // TODO: return the empty array that is already given.
    myFriends () {
      return []
    },

    // TODO: call the getter of the store of the user module 'getUsers'. This getter returns all users. If there are no users,
    // TODO: return the empty array that is already given.
    allUsers () {
      return []
    }
  },

  // TODO: in the created () lifecycle you should call an action from the store from the user module called 'subscribeUsers'
  created () {
    // code here
  },

  methods: {
    // TODO: BONUS
    // TODO: when the user clicks on another user in the list, you can add him as a friend. For this you need to call the action
    // TODO: 'addFriend', along with the id of the user as parameter. Maybe you should also check wether the given id is already
    // TODO: present in your friends list. I said MAYBE.
    addFriend (id) {

    },

    // No need to change this, this is only to display everyone's names in the chat box.
    getFriendName (id) {
      return this.allUsers.find(x => x.id === id).data.name
    }
  }
}
</script>

<style lang="stylus">
  .q-card {
    border-radius 3px
  }
</style>
