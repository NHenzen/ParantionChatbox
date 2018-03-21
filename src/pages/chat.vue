<template>
  <q-page padding class="row justify-between" style="max-height: 80vh;">
    <div class="col-xl-6 bg-white shadow-2" id="message-column">
      <div class="column justify-between full-height">
        <div class="col-11" id="message-body">
          <q-chat-message :key="index" v-for="(msg, index) in messages" :text="[msg.message]"
                          :bg-color="color(msg.from)"
                          :stamp="msg.time | timeFilter" :sent="isMyMsg(msg.from)" text-color="white"
                          :name="getUserOfMsg(msg.from)"
                          v-if="msg.to ==='global'"></q-chat-message>

        </div>
        <div class="col-1">
          <q-input placeholder="Start typing" v-model="myMessage" @keydown="sendMessage"
                   :after="[{icon: 'send',handler () {sendMessage({key: 'Enter'})}}]"></q-input>
        </div>
      </div>
    </div>
    <div class="col-1 mobile-hide"></div>
    <div class="col" style="overflow-y: auto">
      <friends-list></friends-list>
    </div>
  </q-page>
</template>

<script>
import {date} from 'quasar'
import FriendsList from '../components/friendsList'

export default {
  components: {FriendsList},

  filters: {
    timeFilter (time) {
      time = date.formatDate(time, 'HH:mm')
      return time
    }
  },

  data () {
    return {
      myMessages: [],
      myMessage: ''
    }
  },

  computed: {
    users () {
      return this.$store.getters['user/getUsers']
    },
    messages () {
      let messages = this.$store.getters['chat/getGlobalMessages']
      // sort messages by date
      messages.sort((a, b) => {
        a = new Date(a.time)
        b = new Date(b.time)
        return a < b ? -1 : a > b ? 1 : 0
      })
      return messages
    }
  },

  created () {
    this.$store.dispatch('chat/clearState')
    this.$store.dispatch('chat/subScribeToMessages')
  },

  updated () {
    this.keepScrollBarDown()
  },

  methods: {
    sendMessage (value) {
      if (value.key !== 'Enter') return
      if (this.myMessage === '') return

      // The dispatch calls an action from the store.
      this.$store.dispatch('chat/setMessage', this.myMessage)
      this.myMessage = ''
    },

    getUserOfMsg (id) {
      let found = this.users.find(x => x.id === id)
      if (found) return found.data.name
    },

    isMyMsg (id) {
      return id === this.$store.state.user.user.id
    },

    color (id) {
      if (id === this.$store.state.user.user.id) return 'secondary'
      let index = this.users.findIndex(x => x.id === id)

      if (colorArray[index]) return colorArray[index]
      return 'primary'
    },

    keepScrollBarDown () {
      let messageBody = document.querySelector('#message-body')
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
    }
  }
}

const colorArray = ['blue-5', 'red-5', 'pink-5', 'purple-5', 'deep-purple-5', 'indigo-5', 'light-blue-5',
  'cyan-5', 'green-5', 'light-green-5', 'lime-5', 'blue-5', 'yellow-7', 'amber-5', 'orange-5', 'deep-orange-5', 'brown-5',
  'grey-5', 'blue-grey']
</script>

<style lang="stylus">
  #message-body {
    overflow-y auto
    overflow-x hidden
    padding-right 20px
  }

  #message-column {
    border-radius 3px
    padding 10px 10px 0 10px
  }
</style>
