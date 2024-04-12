<template>
  <div class="cards">
    <article class="information card">
      <h2 class="title">{{ title }}</h2>
      <p class="info">{{ description }}</p>
      <a :href="link" target="_blank" class="button">
        <span>Learn more</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" fill="currentColor" />
        </svg>
      </a>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    title: String, // Propiedad para el título
    description: String, // Propiedad para la descripción
    link: String // Propiedad para el enlace
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
  width: 300px;
  height: 230px;
}

.information {
  background-color: #fff2ec;
  padding: 1.5rem;
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
  text-decoration: none; /* Asegúrate de quitar la decoración de texto en el enlace */
  &:hover,
  &:focus {
    background-color: var(--c-indigo);
    color: var(--c-white);
  }
}
</style>
