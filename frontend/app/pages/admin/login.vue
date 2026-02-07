<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title>Login Admin</v-card-title>

      <v-card-text>
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="password" label="Password" type="password" />

        <v-alert v-if="error" type="error" class="mt-2">
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" block :loading="loading" @click="handleLogin">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { adminLogin } from "~~/services/api";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { isAuthenticated } = useAuth();

onMounted(() => {
  if (isAuthenticated()) {
    router.push("/admin/dashboard");
  }
});

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function handleLogin() {
  try {
    loading.value = true;
    error.value = "";

    const data = await adminLogin(email.value, password.value);

    // Simpan token di localStorage
    localStorage.setItem("admin_token", data.token);

    // Redirect ke dashboard
    router.push("/admin/dashboard");
  } catch (err: any) {
    error.value = err.message || "Login gagal";
  } finally {
    loading.value = false;
  }
}
</script>
