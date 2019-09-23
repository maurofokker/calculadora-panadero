<template>
  <div>
    <v-combobox
      v-model="select"
      :items="fluors"
      @change="textChangedType"
      label="Tipo Harina"
    ></v-combobox>
    <template v-if="fluor">
      <v-text-field
        :value="fluor.percent"
        @input="textChanged"
        suffix="%"
      ></v-text-field>
    </template>
    <template v-else>
      <v-text-field
        :value="fluor.percent"
        @input="textChanged"
        suffix="%"
      ></v-text-field>
    </template>
  </div>
</template>

<script>
// import fluors from "@/data/fluors.json";

export default {
  data() {
    return {
      select: this.fluor ? this.fluor.type : ""
    };
  },
  updated() {
    // https://rfvallina.com/blog/2017/12/18/select-value-from-parent-to-child-select-box-component-in-vue.html
    this.select = this.fluor ? this.fluor.type : "";
  },
  props: {
    idx: { type: Number },
    fluors: { type: Array },
    fluor: { type: Object }
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
