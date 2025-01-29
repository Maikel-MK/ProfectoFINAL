const incidencias = document.getElementById('incidencias')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('closeModal')

incidencias.addEventListener('click', () => {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden')
});