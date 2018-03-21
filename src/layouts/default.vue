<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu"></q-btn>
        <q-toolbar-title>
          Praatdoos
          <div slot="subtitle">Gemaakt door mensen van Parantion</div>
        </q-toolbar-title>
        <q-btn @click="logout" flat label="Uitloggen" icon="exit_to_app"></q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>Welkom, {{$store.state.user.user.user}}</q-list-header>
        <q-item to="/">
          <q-item-side icon="people"></q-item-side>
          <q-item-main label="Chat"></q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    logout () {
      this.$router.push('/login')
      this.$store.dispatch('user/clearState')
      this.$store.dispatch('chat/clearState')
    }
  }
}
</script>

<style>
</style>
