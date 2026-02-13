<template>
  <v-container>
    <!-- HEADER -->
    <div class="d-flex justify-space-between align-center mb-4">
      <!-- Title -->
      <h2>Daftar Questions</h2>
      <div class="text-caption text-medium-emphasis">Exam: {{ examTitle }}</div>

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
          @add="() => router.push(`/admin/exam/${examId}/questions/create`)"
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
    <DataTable v-if="!loading" :columns="columns" :items="questions">
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
import { useRoute, useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { fetchQuestions, deleteQuestion } from "~~/services/questionApi";
import DataTable from "~/components/common/DataTable.vue";
import AppPagination from "~/components/common/AppPagination.vue";
import ActionButtons from "~/components/common/ActionButtons.vue";
import { getExamById } from "~~/services/examApi";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();

// console.log("✅ [Child] Render questions/index.vue - route:", route.fullPath);
const examId = route.params.examId as string;

const columns = [
  { key: "order_no", label: "No" },
  { key: "question_text", label: "Pertanyaan" },
  { key: "score", label: "Score" },
  { key: "actions", label: "Aksi", slot: true },
];

const examTitle = ref("");

const questions = ref<any[]>([]);
const loading = ref(false);
const error = ref("");

const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const search = ref("");

async function loadQuestions() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const res = await fetchQuestions(
      token,
      examId,
      page.value,
      limit.value,
      search.value,
    );

    questions.value = res.data;
    totalPages.value = res.pagination.totalPages;
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data questions";
  } finally {
    loading.value = false;
  }
}

function updatePage(newPage: number) {
  page.value = newPage;
  loadQuestions();
}

function updateLimit(newLimit: number) {
  limit.value = newLimit;
  page.value = 1;
  loadQuestions();
}

/* ================= SEARCH ================= */
function handleSearch() {
  page.value = 1;
  loadQuestions();
}

function handleEdit(item: any) {
  router.push(`/admin/exam/${examId}/questions/${item.id}`);
}

async function handleDelete(item: any) {
  if (!confirm(`Hapus soal ini?\n"${item.question_text}"`)) return;

  try {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    await deleteQuestion(token, examId, item.id);

    // 🔁 Update tabel tanpa reload halaman
    questions.value = questions.value.filter((q) => q.id !== item.id);
  } catch (err: any) {
    alert(err.message || "Gagal menghapus soal");
  }
}

async function loadExamInfo() {
  const token = getToken();
  if (!token) return;

  const exam = await getExamById(token, examId);
  examTitle.value = exam.title;
}

onMounted(async () => {
  await loadExamInfo();
  await loadQuestions();
});
</script>
