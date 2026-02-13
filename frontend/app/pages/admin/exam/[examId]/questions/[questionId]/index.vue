<template>
  <v-container>
    <h1>Edit Question</h1>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-card>
      <v-card-text>
        <v-textarea v-model="questionText" label="Isi Pertanyaan" rows="3" />

        <v-text-field
          v-model.number="orderNo"
          label="Urutan Soal"
          type="number"
        />

        <v-text-field
          v-model.number="score"
          label="Nilai (score)"
          type="number"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="secondary"
          variant="tonal"
          @click="
            router.push(`/admin/exam/${examId}/questions/${questionId}/options`)
          "
        >
          Kelola Options
        </v-btn>

        <v-btn color="primary" :loading="loading" @click="handleUpdate">
          Simpan Perubahan
        </v-btn>

        <v-btn variant="text" @click="router.push(backUrl)"> Batal </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { getQuestionById, updateQuestion } from "~~/services/questionApi";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();

const examId = route.params.examId as string;
const questionId = route.params.questionId as string;

// form state
const questionText = ref("");
const orderNo = ref(1);
const score = ref(1);

const loading = ref(false);
const error = ref("");

const backUrl = `/admin/exam/${examId}/questions`;

onMounted(async () => {
  try {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const res = await getQuestionById(token, examId, questionId);

    console.log("RAW QUESTION RESPONSE:", res);

    // Pastikan kita ambil dari res.data
    const data = res.data;

    // isi form dari backend
    questionText.value = data.question_text;
    orderNo.value = data.order_no;
    score.value = data.score;
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data soal";
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

    await updateQuestion(token, examId, questionId, {
      question_text: questionText.value,
      order_no: orderNo.value,
      score: score.value,
    });

    router.push(backUrl);
  } catch (err: any) {
    error.value = err.message || "Gagal menyimpan perubahan";
  } finally {
    loading.value = false;
  }
}
</script>
