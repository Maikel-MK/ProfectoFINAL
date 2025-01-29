function openModal(modalId) {
    const modal = document.getElementById(modalId)
    modal.classList.remove('hidden')
    modal.classList.add('flex')
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId)
    modal.classList.add('hidden')
    modal.classList.add('flex')
}

function toggleAccordion(contentId) {
    const content = document.getElementById(contentId);
    content.classList.toggle('hidden');
}