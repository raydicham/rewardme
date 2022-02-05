<template>
  <div class="max-w-screen-2xl mx-auto h-full">
    <q-layout view="lHr LpR lFr" container style="height:100%">
      <q-header>
        <q-toolbar>
          <q-toolbar-title class="shrink-0 overflow-visible">
            <q-btn to="/" flat padding="0" size="lg" no-caps>
              RewardMe
            </q-btn>
          </q-toolbar-title>
          <div w="full" class="flex justify-center">
            <q-tabs class="mobile-hide">
              <q-route-tab name="kids" to="/">
                Home
              </q-route-tab>
              <q-route-tab name="rewards" to="/rewards">
                Rewards
              </q-route-tab>
            </q-tabs>
          </div>

          <ProfileMenu />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
      <q-footer elevated class="desktop-hide">
        <q-tabs :align="'center'">
          <q-route-tab name="kids" to="/">
            <carbon-home />
            Home
          </q-route-tab>
          <q-route-tab name="rewards" to="/rewards">
            <carbon-gift />
            Rewards
          </q-route-tab>
        </q-tabs>
      </q-footer>
    </q-layout>
  </div>
</template>
