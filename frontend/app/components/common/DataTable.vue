<template>
  <v-sheet rounded="lg" elevation="0" class="soft-table">

    

    <v-table density="comfortable">

      <!-- HEADER -->
      <thead>
        <tr class="table-header">
          <th
            v-for="col in columns"
            :key="col.key"
            class="text-caption font-weight-medium"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <tr
          v-for="item in items"
          :key="item[idKey]"
          class="table-row"
        >
          <td v-for="col in columns" :key="col.key">

            <slot
              v-if="col.slot"
              :name="col.key"
              :item="item"
            />

            <span v-else>
              {{ item[col.key] }}
            </span>

          </td>
        </tr>

        <!-- EMPTY -->
        <tr v-if="items.length === 0">
          <td :colspan="columns.length" class="text-center py-6 text-medium-emphasis">
            Tidak ada data
          </td>
        </tr>
      </tbody>

    </v-table>
  </v-sheet>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    columns: {
      key: string;
      label: string;
      slot?: boolean;
    }[];
    items: any[];
    idKey?: string;
  }>(),
  {
    idKey: "id",
  }
);
</script>

<style scoped>
.soft-table {
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  background: white;
}

/* HEADER */
.table-header {
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.table-header th {
  padding: 14px 18px;
  color: rgb(var(--v-theme-primary));
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/* BODY */
.table-row td {
  padding: 14px 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

/* Hover effect */
.table-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}


</style>
