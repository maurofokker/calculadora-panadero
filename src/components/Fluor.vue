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
// import fluors from "@/data/fluors.json";

export default {
  data() {
    return {
      select: ""
    };
  },
  props: {
    idx: { type: Number },
    fluors: { type: Array }
  },
  methods: {
    textChanged(evt) {
      this.$emit("changetext", evt, this.idx);
    },
    textChangedType(evt) {
      this.select = evt;
      this.$emit("changefluortype", evt, this.idx);
    }
  }
};
</script>

<style lang="scss" scoped></style>
