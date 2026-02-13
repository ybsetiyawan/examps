<template>
  <ClientOnly>
    <v-container>
      <div v-if="ready">
        <h1>Dashboard Admin</h1>
        <p>Selamat datang di panel admin.</p>
      </div>
      <div v-else>
        <v-progress-circular indeterminate color="primary" />
      </div>
    </v-container>
  </ClientOnly>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { isAuthenticated, logout } = useAuth();

const ready = ref(false);

onMounted(() => {
  if (!isAuthenticated()) {
    router.push("/admin/login");
    return;
  }

  // baru tampilkan UI setelah semua aman di client
  ready.value = true;
});

// function handleLogout() {
//   logout();
// }
</script>
