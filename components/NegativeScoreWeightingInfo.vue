<script lang="ts" setup>
const visible = ref(false)
const { locale } = useI18n()
</script>

<template>
  <div>
    <button type="button" class="px-2 icon-btn pt-1" @click="visible = true">
      <div i="carbon-information" />
    </button>

    <div v-if="visible" class="modal">
      <div class="modal-content">
        <div class="flex justify-between items-center">
          <b>{{ $t('quick.negativeScoreWeighting') }}</b>
          <button class="px-2 icon-btn pt-1" @click="visible = false">
            <div i="carbon-close" />
          </button>
        </div>
        <ContentDoc :path="`/${locale}/negativescoreweighting`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
    position: fixed; /* Stay in place */
    display: flex;
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
  }

  /* Modal Content/Box */
  .modal-content {
    @apply bg-white dark:bg-black;
    text-align: left;
    margin: auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    max-width: 500px; /* Could be more or less, depending on screen size */
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
