<template>
  <v-container>
    <h1>Buat Exam Baru</h1>

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
        <v-btn color="primary" :loading="loading" @click="handleSubmit">
          Simpan Exam
        </v-btn>

        <v-btn variant="text" @click="router.push('/admin/exam')">
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
import { createExam } from "~~/services/examApi";

definePageMeta({
  layout: "admin",
});

const router = useRouter();
const { getToken } = useAuth();

const title = ref("");
const description = ref("");
const durationMinutes = ref(60);

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

    if (!title.value || !description.value) {
      error.value = "Judul dan deskripsi wajib diisi";
      return;
    }

    await createExam(token, {
      title: title.value,
      description: description.value,
      duration_minutes: durationMinutes.value,
    });

    // balik ke daftar (nanti kita buat)
    router.push("/admin/exam");
  } catch (err: any) {
    error.value = err.message || "Gagal menyimpan exam";
  } finally {
    loading.value = false;
  }
}
</script>
