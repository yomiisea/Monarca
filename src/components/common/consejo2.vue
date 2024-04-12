<template>
  <div class="cards">
    <article class="information card">
      
      <h2 class="title">Never miss your  meetings</h2>
      <p class="info">Elemenatary tracks all the events for the day as you scheduled and you will never have to worry.</p>
      <button class="button" @click="learnMore">
        <span>Learn more</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
        </svg>
      </button>
    </article>
  </div>
</template>

<script>
export default {
  methods: {
    learnMore() {
      // Aquí puedes definir lo que quieres que suceda cuando se haga clic en el botón "Learn more"
    }
  }
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  width: 90%;
  max-width: 1000px;
  margin: 10vh auto;
}

.card {
  border-radius: 16px;
  box-shadow: 0 30px 30px -25px rgba(#4133B7, .25);
  max-width: 300px;
}

.information {
  background-color: #fff2ec;
  padding: 1.5rem;
}

.tag {
  display: inline-block;
  background-color: var(--c-titan-white);
  color: var(--c-indigo);
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.5em 0.75em;
  line-height: 1;
  border-radius: 6px;
  & + * {
    margin-top: 1rem;
  }
}

.title {
  font-size: 1.5rem;
  color: var(--c-void);
  line-height: 1.25;
  & + * {
    margin-top: 1rem;
  }
}

.info {
  color: var(--c-charcoal);
  & + * {
    margin-top: 1.25rem;
  }
}

.button {
  font: inherit;
  line-height: 1;
  background-color: #f4a261;
  border: 2px solid var(--c-indigo);
  color: var(--c-indigo);
  padding: 0.5em 1em;
  border-radius: 6px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  &:hover,
  &:focus {
    background-color: var(--c-indigo);
    color: var(--c-white);
  }
}
</style>
