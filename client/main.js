import Vue from 'vue';
import App from './src/App.vue';
import AudioRecorder from "vue-audio-recorder"

Vue.use(AudioRecorder)

new Vue(App).$mount('#app');

