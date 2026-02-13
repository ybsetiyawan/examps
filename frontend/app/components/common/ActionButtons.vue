<template>
  <div class="d-flex align-center ga-1">

    <!-- ADD -->
    <v-btn
      v-if="showAdd"
      color="primary"
      variant="flat"
      size="small"
      prepend-icon="mdi-plus"
      @click="$emit('add')"
    >
      Tambah
    </v-btn>

    <!-- EDIT -->
    <v-btn
      v-if="showEdit"
      icon="mdi-pencil"
      variant="text"
      size="small"
      color="primary"
      @click="$emit('edit', item)"
    />

    <!-- DELETE -->
    <v-btn
      v-if="showDelete"
      icon="mdi-delete-outline"
      variant="text"
      size="small"
      color="error"
      @click="$emit('delete', item)"
    />

  </div>
</template>

<script setup lang="ts">
defineProps<{
  item?: any;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}>();

defineEmits<{
  (e: "add"): void;
  (e: "edit", item: any): void;
  (e: "delete", item: any): void;
}>();
</script>
