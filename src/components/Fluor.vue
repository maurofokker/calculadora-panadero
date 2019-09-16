<template>
  <div>
    <!-- <v-text-field label="Tipo Harina" :value="type" disabled></v-text-field> -->
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
      select: "Fuerza",
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
    type: {
      type: String,
      default: ""
    },
    idx: {
      type: Number
    }
  },
  computed: {
    fluorType() {
      return "% Harina " + this.type;
    }
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
