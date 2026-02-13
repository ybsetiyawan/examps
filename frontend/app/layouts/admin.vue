<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Admin Panel</v-app-bar-title>

      <template #append>
        <v-btn
          v-if="isAuthenticated()"
          icon="mdi-logout"
          variant="text"
          @click="handleLogout"
        >
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-if="isAuthenticated()" permanent>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/admin/dashboard"
          router
        />

        <v-list-item
          prepend-icon="mdi-account-group"
          title="Employee"
          to="/admin/employee"
          router
        />

        <v-list-item
          prepend-icon="mdi-email"
          title="Undang Peserta"
          to="/admin/invitations"
          router
        />
        <v-list-item
          prepend-icon="mdi-file-document"
          title="Kelola Exam"
          to="/admin/exam"
          router
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";

const router = useRouter();
const { isAuthenticated, logout } = useAuth();

function handleLogout() {
  logout(); // hapus token
  router.push("/admin/login"); // kembali ke halaman login
}
</script>
