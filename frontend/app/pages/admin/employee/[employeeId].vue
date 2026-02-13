<template>
  <v-container>
    <h1>Edit Employee</h1>

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

        <v-switch
          v-model="isActive"
          label="Status Aktif"
          color="success"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" :loading="loading" @click="handleUpdate">
          Simpan Perubahan
        </v-btn>

        <v-btn variant="text" @click="router.push('/admin/employee')">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import {
  getEmployeeById,
  updateEmployee,
} from "~~/services/employeeApi";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();

const id = route.params.employeeId as string;

console.log("ROUTE PARAM ID:", route.params.id);


const nik = ref("");
const name = ref("");
const spcd = ref("");
const spname = ref("");
const email = ref("");
const isActive = ref(true);

const loading = ref(false);
const error = ref("");

onMounted(async () => {
  try {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const data = await getEmployeeById(token, id);

    // isi form dari backend
    nik.value = data.nik;
    name.value = data.name;
    spcd.value = data.spcd;
    spname.value = data.spname;
    email.value = data.email;
    isActive.value = data.is_active;
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data";
  }
});

async function handleUpdate() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    await updateEmployee(token, id, {
      nik: nik.value,
      name: name.value,
      spcd: spcd.value,
      spname: spname.value,
      email: email.value,
      is_active: isActive.value,
    });

    // balik ke daftar setelah sukses
    router.push("/admin/employee");
  } catch (err: any) {
    error.value = err.message || "Gagal menyimpan perubahan";
  } finally {
    loading.value = false;
  }
}
</script>
