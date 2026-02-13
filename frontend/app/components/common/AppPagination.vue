<template>
  <div class="d-flex justify-space-between align-center mt-4">

    <!-- LEFT: Informasi Halaman -->
    <span class="text-caption text-medium-emphasis">
      Halaman {{ page }} dari {{ totalPages }}
    </span>

    <!-- RIGHT: Pagination + Limit -->
    <div class="d-flex align-center ga-3">

      <div class="d-flex align-center ga-1">

        <v-btn
          icon="mdi-chevron-double-left"
          variant="text"
          density="compact"
          :disabled="page <= 1"
          @click="$emit('update:page', 1)"
        />

        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          density="compact"
          :disabled="page <= 1"
          @click="$emit('update:page', page - 1)"
        />

        <v-btn
          icon="mdi-chevron-right"
          variant="text"
          density="compact"
          :disabled="page >= totalPages"
          @click="$emit('update:page', page + 1)"
        />

        <v-btn
          icon="mdi-chevron-double-right"
          variant="text"
          density="compact"
          :disabled="page >= totalPages"
          @click="$emit('update:page', totalPages)"
        />

      </div>

      <!-- LIMIT -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
          >
            {{ localLimit }}
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item
            v-for="item in [5,10,15]"
            :key="item"
            @click="$emit('update:limit', item)"
          >
            <v-list-item-title>
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  page: number;
  totalPages: number;
  limit: number;
}>();

const localLimit = ref(props.limit);

watch(
  () => props.limit,
  (v) => (localLimit.value = v)
);
</script>
