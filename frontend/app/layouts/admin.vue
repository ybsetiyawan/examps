<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Admin Panel</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item title="Dashboard" />
        <v-list-item title="Kelola Ujian" />
        <v-list-item title="Undang Peserta" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
