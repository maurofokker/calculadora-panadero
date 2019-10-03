<template>
  <v-card>
    <v-card-title>
      <span class="headline">Save New Formula</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Formula name"
              required
              v-model="name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="blue darken-1" text @click="$emit('closeModal')"
        >Close</v-btn
      >
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: ""
  }),
  methods: {
    save() {
      this.$emit("saveFormula", this.name);
      this.name = "";
    }
  }
};
</script>

<style scoped></style>
