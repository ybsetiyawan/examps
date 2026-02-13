<template>
  <v-container>
    <h1>Tambah Employee</h1>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-card>
      <v-card-text>
        <v-text-field v-model="nik" label="NIK" />
        <v-text-field v-model="name" label="Nama" />
        <v-text-field v-model="spcd" label="Kode SP (spcd)" />
        <v-text-field v-model="spname" label="Nama SP (spname)" />
        <v-text-field v-model="email" label="Email" />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :loading="loading" @click="handleSubmit">
          Simpan
        </v-btn>

        <v-btn variant="text" @click="router.push('/admin/employee')">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { createEmployee } from "~~/services/employeeApi";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { getToken } = useAuth();

const nik = ref("");
const name = ref("");
const spcd = ref("");
const spname = ref("");
const email = ref("");

const loading = ref(false);
const error = ref("");

async function handleSubmit() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    await createEmployee(token, {
      nik: nik.value,
      name: name.value,
      spcd: spcd.value,
      spname: spname.value,
      email: email.value,
    });

    // Setelah sukses → balik ke daftar
    router.push("/admin/employee");
  } catch (err: any) {
    error.value = err.message || "Gagal menyimpan data";
  } finally {
    loading.value = false;
  }
}
</script>
