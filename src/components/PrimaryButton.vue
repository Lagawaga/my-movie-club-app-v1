<template>
  <button class="primary-btn">{{ caption }}</button>
</template>

<script>
export default {
  props: {
    caption: String,
  },
};
</script>

<style scoped>
.primary-btn {
  padding: 10px 20px;
  border: none;
  background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}

.primary-btn:hover {
  background-image: linear-gradient(to left, #6a11cb 0%, #2575fc 100%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.primary-btn:active {
  transform: translateY(2px);
}
</style>
