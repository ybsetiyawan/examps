<template>
  <v-container>
    <h1>Edit Exam</h1>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-card>
      <v-card-text>
        <v-text-field v-model="title" label="Judul Exam" />

        <v-textarea v-model="description" label="Deskripsi" />

        <v-text-field
          v-model.number="durationMinutes"
          label="Durasi (menit)"
          type="number"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="secondary"
          @click="
            () => {
              // console.log('➡️ Navigating to questions for exam:', examId);
              router.push(`/admin/exam/${examId}/questions`);
            }
          "
        >
          Kelola Questions
        </v-btn>
        <v-btn color="primary" :loading="loading" @click="handleUpdate">
          Simpan Perubahan
        </v-btn>
        <v-btn variant="text" @click="router.push('/admin/exam')">
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
import { getExamById, updateExam } from "~~/services/examApi";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();

const examId = route.params.examId as string;

const title = ref("");
const description = ref("");
const durationMinutes = ref(60);
const startAt = ref("");
const endAt = ref("");

const loading = ref(false);
const error = ref("");
// console.log("📌 [Parent] Render [examId].vue - current route:", route.fullPath);

onMounted(async () => {
  // console.log("📌 [Parent] Mounted [examId].vue, params:", route.params);
  try {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const data = await getExamById(token, examId);

    // isi form dari backend
    title.value = data.title;
    description.value = data.description;
    durationMinutes.value = data.duration_minutes;
    startAt.value = data.start_at || "";
    endAt.value = data.end_at || "";
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data exam";
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

    await updateExam(token, examId, {
      title: title.value,
      description: description.value,
      duration_minutes: durationMinutes.value,
    });

    router.push("/admin/exam");
  } catch (err: any) {
    error.value = err.message || "Gagal menyimpan perubahan";
  } finally {
    loading.value = false;
  }
}
</script>
