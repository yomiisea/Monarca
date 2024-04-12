<template>
    <div class="sos-page">
    <h1 class="sos-text">🚨SOS🚨</h1>
    <div class="timer">
      <h1>{{ timeLeft }}</h1>
    </div>
</div>
  </template>
  
  <script>
  export default {
    name: 'SOSPage',
    data() {
      return {
        timeLeft: 10
      };
    },
    mounted() {
      // Iniciar el temporizador al montar el componente
      this.startTimer();
    },
    methods: {
      startTimer() {
        // Reducir el tiempo restante cada segundo
        this.timerInterval = setInterval(() => {
          // Verificar si el tiempo ha llegado a cero
          if (this.timeLeft > 0) {
            // Decrementar el tiempo restante
            this.timeLeft--;
          } else {
            // Detener el temporizador cuando el tiempo llega a cero
            clearInterval(this.timerInterval);
            alert('¡Tiempo completado!');
          }
        }, 1000);
      }
    },
    beforeDestroy() {
      // Limpiar el intervalo antes de destruir el componente para evitar fugas de memoria
      clearInterval(this.timerInterval);
    }
  };
  </script>
  
  <style scoped>
  .timer {
    font-size: 3rem;
    text-align: center;
    
  }

  .sos-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}

.sos-text {
  font-size: 4rem;
  margin-top: 20vh;
}
  </style>
  