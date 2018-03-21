<template>
  <div>
    <q-card class="bg-white shadow-2">
      <q-list link v-if="allUsers">
        <q-list-header>Online ({{allUsers.length}}) <q-icon name="fiber_manual_record" color="green"></q-icon></q-list-header>
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
        <!--<q-item>-->
        <!--<q-item-main label="Online"></q-item-main>-->
        <!--</q-item>-->
        <!--<q-item v-for="(friend, index) in myFriends" :key="index" v-if="friend.status === 'online'">-->
        <!--<q-item-side icon="person"></q-item-side>-->
        <!--<q-item-main :label="friend.name"></q-item-main>-->
        <!--</q-item>-->

        <!--<q-item-separator></q-item-separator>-->

        <!--<q-item>-->
        <!--<q-item-main label="Offline"></q-item-main>-->
        <!--</q-item>-->
        <!--<q-item v-for="(friend, index) in myFriends" :key="index" v-if="friend.status === 'offline'">-->
        <!--<q-item-side icon="person"></q-item-side>-->
        <!--<q-item-main :label="friend.name"></q-item-main>-->
        <!--</q-item>-->
      </q-list>
    </q-card>
  </div>
</template>

<script>
export default {
  computed: {
    myFriends () {
      if (this.$store.getters['user/getFriends']) return this.$store.getters['user/getFriends']
      else return []
    },

    allUsers () {
      if (this.$store.getters['user/getUsers']) return this.$store.getters['user/getUsers']
      else return []
    }
  },

  created () {
    this.$store.dispatch('user/subscribeUsers')
  },

  methods: {
    addFriend (id) {
      let isAdded = this.myFriends.find(x => x.id === id)
      if (isAdded) return
      this.$store.dispatch('user/addFriend', id)
    },

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
