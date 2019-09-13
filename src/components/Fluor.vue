<template>
  <div>
    <v-text-field label="Tipo Harina" :value="type" disabled></v-text-field>
    <v-text-field @input="textChanged" suffix="%"></v-text-field>
  </div>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
