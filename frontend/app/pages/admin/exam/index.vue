<template>
  <v-container>
    <!-- HEADER -->
    <div class="d-flex justify-space-between align-center mb-4">
      <!-- Title -->
      <h2>Daftar Exams</h2>

      <!-- Search + Add -->
      <div class="d-flex align-center ga-2">
        <v-text-field
          v-model="search"
          placeholder="Cari Title"
          density="compact"
          variant="outlined"
          hide-details
          clearable
          style="width: 220px"
          @keyup.enter="handleSearch"
        />

        <ActionButtons
          :show-add="true"
          @add="() => router.push('/admin/exam/create')"
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
    <DataTable v-if="!loading" :columns="columns" :items="exams">
      <template #is_active="{ item }">
        <v-chip :color="item.is_active ? 'success' : 'grey'">
          {{ item.is_active ? "Aktif" : "Nonaktif" }}
        </v-chip>
      </template>

      <template #actions="{ item }">
        <div class="d-flex justify-end ga-2">
          <ActionButtons :item="item" :show-edit="true" @edit="handleEdit" />
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
import { fetchExams } from "~~/services/examApi";
import DataTable from "~/components/common/DataTable.vue";
import AppPagination from "~/components/common/AppPagination.vue";
import ActionButtons from "~/components/common/ActionButtons.vue";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { getToken } = useAuth();

const columns = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "duration_minutes", label: "Duration (min)" },
  { key: "start_at", label: "Start" },
  { key: "end_at", label: "Finish" },
  { key: "actions", label: "", slot: true }, // ✅ WAJIB
];

const exams = ref<any[]>([]);
const loading = ref(false);
const error = ref("");

const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const search = ref("");

async function loadExams() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const res = await fetchExams(token, page.value, limit.value, search.value);

    exams.value = res.data;
    totalPages.value = res.pagination.totalPages;
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data exams";
  } finally {
    loading.value = false;
  }
}

function updatePage(newPage: number) {
  page.value = newPage;
  loadExams();
}

function updateLimit(newLimit: number) {
  limit.value = newLimit;
  page.value = 1;
  loadExams();
}

/* ================= SEARCH ================= */
function handleSearch() {
  page.value = 1;
  loadExams();
}

function handleEdit(item: any) {
  // console.log("EDIT ITEM:", item); // ← debug dulu
  // console.log("EDIT ID:", item.id);
  router.push(`/admin/exam/${item.id}`);
}


onMounted(loadExams);
</script>
