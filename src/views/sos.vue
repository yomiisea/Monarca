<template>
    <div class="sos-page">
    <h1 class="sos-text">🚨SOS🚨</h1>
    <div class="timer">
      <h1>{{ timeLeft }}</h1>
    </div>
    <button class="cancel-button" @click="cancelAlert">Cancelar</button>
</div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  export default {
    name: 'SOSPage',
    data() {
      return {
        timeLeft: 30
      };
    },
    mounted() {
      // Iniciar el temporizador al montar el componente
      this.startTimer();
    },
    methods: {
        cancelAlert() {
        Swal.fire({
        icon: 'info',
        title: 'Alerta cancelada',
        text: 'La alerta ha sido cancelada',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir a otra página
          this.$router.push('/home');
        }
      })},
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
    color: azure;
    
  }
  .cancel-button {

  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #d32f2f;
}
  .sos-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background: linear-gradient(90deg, #c45643, #DD2476);
}

.sos-text {
  font-size: 4rem;
  margin-top: 20vh;
  color: azure;
}
  </style>
  