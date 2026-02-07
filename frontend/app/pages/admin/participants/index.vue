<template>
  <v-container>
    <h1>Daftar Peserta</h1>

    <!-- <v-btn color="primary" class="mb-4" to="/admin/participants/create">
      Tambah Peserta
    </v-btn> -->

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    />

    <v-table v-else>
      <thead>
        <tr>
          <th>NIK</th>
          <th>Nama</th>
          <th>SPCD</th>
          <th>SP Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in participants" :key="p.id">
          <td>{{ p.nik }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.spcd }}</td>
          <td>{{ p.spname }}</td>
          <td>{{ p.email }}</td>
          <td>
            <v-chip :color="p.is_active ? 'success' : 'grey'">
              {{ p.is_active ? "Aktif" : "Nonaktif" }}
            </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { fetchParticipants } from "~~/services/participantApi";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { getToken } = useAuth();

const participants = ref<any[]>([]);
const loading = ref(false);
const error = ref("");

onMounted(async () => {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    participants.value = await fetchParticipants(token);
  } catch (err: any) {
    error.value = err.message || "Gagal memuat peserta";
  } finally {
    loading.value = false;
  }
});
</script>
