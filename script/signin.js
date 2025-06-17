document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');
  const wrapper = document.getElementById('emailWrapper');
  const nextBtn = document.getElementById('nextBtn');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    const isValid = emailRegex.test(emailInput.value.trim());
    wrapper.classList.toggle('valid', isValid);
    nextBtn.disabled = !isValid;
  }

  emailInput.addEventListener('input', validate);
  validate();
});
