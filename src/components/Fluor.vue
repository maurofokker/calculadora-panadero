<template>
  <div>
    <v-combobox
      v-model="select"
      :items="fluors"
      @change="textChangedType"
      label="Tipo Harina"
    ></v-combobox>
    <v-text-field @input="textChanged" suffix="%"></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: this.type,
      fluors: [
        "Fuerza",
        "Fina",
        "Whole Grain",
        "Centeno Oscuro",
        "Centeno Blanco"
      ]
    };
  },
  props: {
    type: { type: String },
    idx: { type: Number }
  },
  methods: {
    textChanged(evt) {
      this.$emit("changetext", evt, this.idx);
    },
    textChangedType(evt) {
      this.$emit("changefluortype", evt, this.idx);
    }
  }
};
</script>

<style lang="scss" scoped></style>
