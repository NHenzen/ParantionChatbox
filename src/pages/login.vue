<template>
  <div class="layout-padding row justify-center items-center" id="login-body">
    <q-card class="bg-white col-xl-3 col-md-6 col-sm-12 col-xs-12">
      <q-card-title>
        <h4 class="no-margin">Inloggen</h4>
      </q-card-title>
      <q-card-main>
        <q-input v-model="username" float-label="Voer een gebruikersnaam in" @keydown="setUser"></q-input>
      </q-card-main>
      <q-card-actions>
        <q-btn @click="setUser({key: 'Enter'})" class="full-width" color="primary" label="Ga verder"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },

  methods: {
    setUser (value) {
      // The checks are there to ensure that a user should enter when he has entered a username
      if (value.key !== 'Enter') return
      if (this.username === '') return

      this.$store.dispatch('user/login', this.username)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
  #login-body {
    height 100vh
    .q-card {
      min-height 250px
      .q-card-main {
        margin-top 30px
      }
      .q-card-actions {
        margin-top 40px
      }
    }
  }
</style>
