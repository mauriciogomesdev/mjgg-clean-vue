<template>
  <div class="header-bar" >
    <h1 class="text-2xl mb-4">Mjgg Clean</h1>
    <ConsultaApi />
  </div>
</template>

<script setup>
import ConsultaApi from "./views/ConsultaApi.vue";

</script>
<script>
import Toast from "primevue/toast";

export default {
  components: { Toast }
};
</script>
