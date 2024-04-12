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
  import twilio from 'twilio';

const TWILIO_ID = 'AC3676ea6cbaac373808ba4d13125a73e7';
const TWILIO_SK = 'b8ca1d734df66471e7c9394b9f451fe3';

const client = twilio(TWILIO_ID, TWILIO_SK);
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
            enviarMensaje();
          }
        }, 1000);
      }
    },
    beforeDestroy() {
      // Limpiar el intervalo antes de destruir el componente para evitar fugas de memoria
      clearInterval(this.timerInterval);
    }
  };
  function enviarMensaje() {
  // Obtener la ubicación actual del usuario (por ejemplo, utilizando la API de geolocalización del navegador)
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Crear la URL de Google Maps con las coordenadas de latitud y longitud
    const direccionGoogleMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Crear el mensaje con la ubicación de Google Maps
    const mensaje = `Este es mi mensaje con la ubicación actual:\n${direccionGoogleMaps}`;

    // Enviar el mensaje utilizando Twilio
    client.messages
      .create({
        body: mensaje,
        from: 'whatsapp:+14155238886', // Este es el número de Twilio para enviar mensajes de WhatsApp
        to: 'whatsapp:+59173515673' // El número de WhatsApp al que deseas enviar el mensaje
      })
      .then(message => console.log(message.sid))
      .catch(error => console.error('Error al enviar el mensaje:', error));
  }, error => {
    console.error('Error al obtener la ubicación del usuario:', error);
  });
}
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
  