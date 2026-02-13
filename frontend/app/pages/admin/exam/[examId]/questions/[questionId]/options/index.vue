<template>
  <v-container>

    <!-- HEADER -->
    <div class="d-flex justify-space-between align-center mb-4">
      <div>
        <h2 class="text-h6 font-weight-medium">
          Pilihan Jawaban
        </h2>
        <div class="text-caption text-medium-emphasis">
          Question Title: {{ questionTitle }}
        </div>
      </div>

      <ActionButtons
        :show-add="true"
        @add="() => router.push(`${basePath}/create`)"
      />
    </div>

    <!-- ERROR -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      density="compact"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <!-- LOADING -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-4"
    />

    <!-- TABLE -->
    <DataTable
      v-if="!loading"
      :columns="columns"
      :items="options"
    >
      <template #is_correct="{ item }">
        <v-chip
          size="small"
          :color="item.is_correct ? 'success' : 'grey'"
          variant="tonal"
        >
          {{ item.is_correct ? 'Benar' : 'Salah' }}
        </v-chip>
      </template>

      <template #actions="{ item }">
        <ActionButtons
          :item="item"
          :show-edit="true"
          :show-delete="true"
          @edit="handleEdit"
        />
      </template>
    </DataTable>

  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { fetchOptions, deleteOption } from "~~/services/optionApi";

import DataTable from "~/components/common/DataTable.vue";
import ActionButtons from "~/components/common/ActionButtons.vue";
import { getQuestionById } from "~~/services/questionApi";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();

const examId = route.params.examId as string;
const questionId = route.params.questionId as string;

const basePath = `/admin/exam/${examId}/questions/${questionId}/options`;

const columns = [
  { key: "text", label: "Jawaban" },
  { key: "label", label: "Pilihan Jawaban" },
  { key: "is_correct", label: "Correct?", slot: true },
  { key: "actions", label: "", slot: true },
];

const questionTitle = ref("");


const options = ref<any[]>([]);
const loading = ref(false);
const error = ref("");

async function loadOptions() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const res = await fetchOptions(token, examId, questionId);

    options.value = res.data;

  } catch (err: any) {
    error.value = err.message || "Gagal memuat options";
  } finally {
    loading.value = false;
  }
}

function handleEdit(item: any) {
  router.push(`${basePath}/${item.id}`);
}

async function loadQuestionInfo() {
  try {
    const token = getToken();
    if (!token) return;

    const response = await getQuestionById(
      token,
      examId,
      questionId
    );

    // 🔥 Sesuaikan dengan response backend
    questionTitle.value = response.data.question_text;

  } catch (err: any) {
    console.error(err.message);
  }
}



// async function handleDelete(item: any) {
//   if (!confirm(`Hapus pilihan ini?\n"${item.option_text}"`)) return;

//   try {
//     const token = getToken();
//     if (!token) {
//       router.push("/admin/login");
//       return;
//     }

//     await deleteOption(token, examId, questionId, item.id);

//     options.value = options.value.filter(o => o.id !== item.id);

//   } catch (err: any) {
//     alert(err.message || "Gagal menghapus option");
//   }
// }

onMounted(loadOptions);

onMounted(async () => {
  await loadQuestionInfo();
  await loadOptions();
});
</script>
