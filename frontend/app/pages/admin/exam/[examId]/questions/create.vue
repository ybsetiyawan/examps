<template>
  <v-container>
    <h1>Tambah Question</h1>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-card>
      <v-card-text>
        <v-textarea
          v-model="questionText"
          label="Isi Pertanyaan"
          rows="3"
        />

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
          color="primary"
          :loading="loading"
          @click="handleCreate"
        >
          Simpan Question
        </v-btn>

        <v-btn variant="text" @click="router.push(backUrl)">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "#imports";
import { useAuth } from "~~/app/composables/useAuth";
import { createQuestion } from "~~/services/questionApi";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();

const examId = route.params.examId as string;

// form state
const questionText = ref("");
const orderNo = ref(1);
const score = ref(1);

const loading = ref(false);
const error = ref("");

// URL kembali ke daftar questions
const backUrl = `/admin/exam/${examId}/questions`;

async function handleCreate() {
  try {
    loading.value = true;
    error.value = "";

    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    await createQuestion(token, examId, {
      question_text: questionText.value,
      order_no: orderNo.value,
      score: score.value,
    });

    // balik ke daftar questions
    router.push(backUrl);
  } catch (err: any) {
    error.value = err.message || "Gagal menyimpan soal";
  } finally {
    loading.value = false;
  }
}
</script>
