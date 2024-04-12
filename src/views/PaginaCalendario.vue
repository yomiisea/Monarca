<template>
  <div class="contenedor">

    <div class="basico">
      <div class="card">
        <div class="calendar">
          <div class="header">
            <button @click="previousWeek">&lt;</button>
            <h2>{{ currentWeek }}</h2>
            <button @click="nextWeek">&gt;</button>
          </div>
          <div class="days">
            <div v-for="weekInfo in weeksInMonth" :key="weekInfo[0].formattedDay" class="week">
              <div v-for="dayInfo in weekInfo" :key="dayInfo.day" class="day" :class="dayInfo.category">
                <div>{{ getDayOfWeek(dayInfo.formattedDay) }}</div> <!-- Mostrar el día de la semana -->
                <div>{{ dayInfo.formattedDay.slice(8, 10) }}</div> <!-- Mostrar solo el día del mes -->
                <div v-if="dayInfo.activities" class="activities-container">
                  <div v-for="(activity, index) in filteredActivities(dayInfo.activities)" :key="index" class="activity" :style="{ backgroundColor: activity.color }">
                    Tarea {{ activity.name }}   a las    {{ activity.startTime }} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, startOfWeek, endOfWeek, eachWeekOfInterval, getDay } from 'date-fns';
import { useTareasStore } from '@/stores/tareasStore.js';

export default {
  name: 'PaginaCalendario',
  data() {
    return {
      currentDate: new Date(),
      activities: [],
    };
  },
  setup() {
    const storeTareas = useTareasStore();
    return { storeTareas };
  },
  async mounted() {
    const response = await this.storeTareas.getTareasByUsuarioCalendario();
    console.log('Tareas obtenidas:', response);
    this.activities = response;
  },
  computed: {
    currentWeek() {
      return format(this.currentDate, 'MMMM yyyy');
    },
    weeksInMonth() {
      const start = startOfWeek(startOfWeek(this.currentDate));
      const end = endOfWeek(endOfWeek(this.currentDate));
      const weeks = eachWeekOfInterval({ start, end }).map(weekStart => {
        const days = [];
        for (let i = 0; i < 7; i++) {
          const day = new Date(weekStart);
          day.setDate(day.getDate() + i);
          const formattedDay = format(day, 'yyyy-MM-dd');
          const activities = this.activities.filter(act => {
            const activityStartDate = new Date(act.startDatetime);
            const activityEndDate = new Date(act.endDatetime);
            const formattedActivityStartDate = format(activityStartDate, 'yyyy-MM-dd');
            const formattedActivityEndDate = format(activityEndDate, 'yyyy-MM-dd');
            return formattedDay === formattedActivityStartDate || formattedDay === formattedActivityEndDate;
          });
          days.push({
            formattedDay,
            category: activities.length > 0 ? activities[0].category : null,
            activities: activities.map((act, index) => ({
              description: act.description,
              startTime: format(new Date(act.startDatetime), 'HH:mm'),
              endTime: format(new Date(act.startDatetime), 'HH:mm'),
              name: act.name,
              idEstado: act.idEstado, // Asegúrate de agregar idEstado a la estructura del objeto activity
              color: this.getColor(index),
            })),
          });
        }
        return days;
      });
      return weeks;
    },
  },
  methods: {

    filteredActivities(activities){
      return activities.filter(activity=> activity.idEstado=== 1 || activity.idEstado===2);
    },
    previousWeek() {
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      this.currentDate = newDate;
    },
    nextWeek() {
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      this.currentDate = newDate;
    },
    getColor(index) {
      const colors = ['#52796F', '#84A98C', '#90ee90'];
      return colors[index % colors.length];
    },
    getDayOfWeek(formattedDay) {
      const daysOfWeek = [ 'Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo',];
      const date = new Date(formattedDay);
      const dayIndex = getDay(date);
      return daysOfWeek[dayIndex];
    },
  },
};
</script>


<style scoped>
/* Estilos para el componente Home */
.calendar {
  width:100%;
  margin: 5%;
}
.header {
  display: flex;
  justify-content:center;
  align-items: end;
}
.days {
  width: 90%;
  height:auto;
  
  grid-template-columns: repeat(1, 8fr);
  gap: 3px;
}
/**  */


.day {
  border: 1px solid #ccc;
  padding: 2%;
  height: 90px;
  margin: 10px;
  background: rgb(202, 210, 197);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;

}

.activities-container {
  margin-left: 25px;
margin-top: -15px;
}
.activity {
  padding: 5px;
  font-size: 1rem;
  align-content: center;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;
 margin-right: 10px;
 padding-left: 20px;
 margin: 4px;
}

.card {
border: 0px solid #000000;
border-radius: 8px;
overflow: hidden;
margin-bottom: 1rem;
background: rgb(47, 62, 70);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;
 margin: 5%;


}

.basico {
border: 0px solid #000000;
border-radius: 8px;
overflow: hidden;
margin-bottom: 1rem;
background: rgb(132, 169, 140);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;

width:800px
}

.header{
border: 0px solid #000000;
border-radius: 8px;
margin-bottom: 1rem;
background: #CAD2C5;
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-family: 'Times New Roman', Times, serif;
  width: 300px;
}
.contenedor {
padding: 20px;
margin-bottom: 70px;
margin-left: 20%;
margin-right: 50%;
}
button{
border: 0px solid #000000;
border-radius: 2px;
margin-bottom: 1rem;
background: rgb(221, 229, 182);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  
  width: 30px;
  margin: 10px;
}
@media (max-width: 860px) {
.days {
  grid-template-columns: repeat(3, 1fr); /* Cambiar a 3 columnas en lugar de 7 */
  gap: 1px; /* Reducir el espacio entre columnas */
}
.basico {
  margin: 5%;
 
}
.day {
  border: 1px solid #ccc;
  margin: 5%;
  height: 90px;
}
.basico {

width:600px;
margin-right: 150px;
}

}

@media (max-width: 540px) {
.days {
  grid-template-columns: repeat(1, 1fr); /* Cambiar a 3 columnas en lugar de 7 */
  gap: 1px; /* Reducir el espacio entre columnas */
}
.day {
  border: 1px solid #ccc;
  margin: 5%;
  height: 70px;
  
}
.basico {

width:300px;


}
.activity {
  font-size: 0.8rem;
  margin: 1px;
}
.contenedor {

margin-left: 10%;
margin-right: 50%;
}

.header{


  width: 240px;
}

}

@media (max-width: 400px) {

.days {
  grid-template-columns: repeat(1, 1fr); /* Cambiar a 3 columnas en lugar de 7 */
  gap: 1px; /* Reducir el espacio entre columnas */
}
.day {
  border: 1px solid #ccc;
  margin: 2%;
  height: 90px;
 
}
.basico {
  margin: 0px;
  width:210px;
}
.header{
width: 165px;
}

}

</style>