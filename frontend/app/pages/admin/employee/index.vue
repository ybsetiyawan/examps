<template>
  <v-container>
    <!-- HEADER -->
    <div class="d-flex justify-space-between align-center mb-4">
      <!-- Title -->
      <h2>Daftar Employee</h2>

      <!-- Search + Add -->
      <div class="d-flex align-center ga-2">
        <v-text-field
          v-model="search"
          placeholder="Cari NIK / Nama"
          density="compact"
          variant="outlined"
          hide-details
          clearable
          style="width: 220px"
          @keyup.enter="handleSearch"
        />

        <ActionButtons
          :show-add="true"
          @add="() => router.push('/admin/employee/create')"
        />
      </div>
    </div>

    <!-- Error -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      density="compact"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <!-- Loading -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-4"
    />

    <!-- TABEL -->
    <DataTable v-if="!loading" :columns="columns" :items="employees">
      <template #is_active="{ item }">
        <v-chip :color="item.is_active ? 'success' : 'grey'">
          {{ item.is_active ? "Aktif" : "Nonaktif" }}
        </v-chip>
      </template>

      <template #actions="{ item }">
        <div class="d-flex justify-end ga-2">
          <ActionButtons
            :item="item"
            :show-edit="true"
            :show-delete="true"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>
      </template>
    </DataTable>

    <!-- PAGINATION -->
    <AppPagination
      :page="page"
      :limit="limit"
      :total-pages="totalPages"
      @update:page="updatePage"
      @update:limit="updateLimit"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { fetchEmployees, deleteEmployee } from "~~/services/employeeApi";

import DataTable from "~/components/common/DataTable.vue";
import AppPagination from "~/components/common/AppPagination.vue";
import ActionButtons from "~/components/common/ActionButtons.vue";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { getToken } = useAuth();

/* ================= STATE ================= */
const employees = ref<any[]>([]);
const loading = ref(false);
const error = ref("");

const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const search = ref("");

/* ================= KOLOM ================= */
const columns = [
  { key: "nik", label: "NIK" },
  { key: "name", label: "Nama" },
  { key: "spcd", label: "SPCD" },
  { key: "spname", label: "SP Name" },
  { key: "email", label: "Email" },
  { key: "is_active", label: "Status", slot: true },
  { key: "actions", label: "", slot: true },
];

/* ================= LOAD ================= */
async function loadEmployees() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const res = await fetchEmployees(
      token,
      page.value,
      limit.value,
      search.value,
    );

    employees.value = res.data;
    totalPages.value = res.pagination.totalPages;
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data karyawan";
  } finally {
    loading.value = false;
  }
}

/* ================= PAGINATION HANDLER ================= */
function updatePage(newPage: number) {
  page.value = newPage;
  loadEmployees();
}

function updateLimit(newLimit: number) {
  limit.value = newLimit;
  page.value = 1;
  loadEmployees();
}

/* ================= SEARCH ================= */
function handleSearch() {
  page.value = 1;
  loadEmployees();
}

/* ================= ACTION ================= */
function handleEdit(item: any) {
  router.push(`/admin/employee/${item.id}`);
}

async function handleDelete(item: any) {
  if (!confirm(`Hapus karyawan ${item.name}?`)) return;

  try {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    await deleteEmployee(token, item.id);

    loadEmployees(); // refresh data dari backend
  } catch (err: any) {
    alert(err.message || "Gagal menghapus data");
  }
}

/* ================= INIT ================= */
onMounted(loadEmployees);
</script>
