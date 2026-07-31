document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const btnText = sendBtn?.querySelector('.btn-text');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  const formMessage = document.getElementById('formMessage');

  if (!contactForm) return;

  function setError(input, errorEl, message) {
    if (!input || !errorEl) return;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  function setValid(input, errorEl) {
    if (!input || !errorEl) return;
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
  }

  function clearFieldState(input, errorEl) {
    if (!input || !errorEl) return;
    input.classList.remove('is-invalid', 'is-valid');
    input.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
  }

  function clearFormMessage() {
    if (!formMessage) return;
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }

  function showFormMessage(type, text) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setLoading(isLoading) {
    if (!sendBtn || !btnText) return;
    sendBtn.disabled = isLoading;
    sendBtn.classList.toggle('is-loading', isLoading);
    btnText.textContent = isLoading ? 'Sending...' : 'Send Message';
  }

  function validateForm() {
    let isValid = true;
    clearFormMessage();

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const subject = subjectInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!name) {
      setError(nameInput, nameError, 'Name is required.');
      isValid = false;
    } else if (name.length < 3) {
      setError(nameInput, nameError, 'Name should be at least 3 characters.');
      isValid = false;
    } else {
      setValid(nameInput, nameError);
    }

    if (!email) {
      setError(emailInput, emailError, 'Email is required.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setError(emailInput, emailError, 'Please enter a valid email.');
      isValid = false;
    } else {
      setValid(emailInput, emailError);
    }

    if (!subject) {
      setError(subjectInput, subjectError, 'Subject is required.');
      isValid = false;
    } else if (subject.length < 3) {
      setError(subjectInput, subjectError, 'Subject should be at least 3 characters.');
      isValid = false;
    } else {
      setValid(subjectInput, subjectError);
    }

    if (!message) {
      setError(messageInput, messageError, 'Message is required.');
      isValid = false;
    } else if (message.length < 20) {
      setError(messageInput, messageError, 'Message should be at least 20 characters.');
      isValid = false;
    } else {
      setValid(messageInput, messageError);
    }

    return isValid;
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (!input) return;
    const errorMap = {
      name: nameError,
      email: emailError,
      subject: subjectError,
      message: messageError,
    };
    input.addEventListener('input', () => {
      clearFieldState(input, errorMap[input.id]);
      clearFormMessage();
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showFormMessage('error', 'Please fix the highlighted fields.');
      contactForm.querySelector('.is-invalid')?.focus();
      return;
    }

    setLoading(true);

    try {
      // Demo-only flow: add your real email service / backend later.
      await new Promise((resolve) => setTimeout(resolve, 900));

      contactForm.reset();

      [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
        input?.classList.remove('is-valid', 'is-invalid');
        input?.setAttribute('aria-invalid', 'false');
      });

      [nameError, emailError, subjectError, messageError].forEach((el) => {
        if (el) el.textContent = '';
      });

      showFormMessage('success', 'Thanks! Your message has been sent.');
    } catch (error) {
      showFormMessage('error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  });
});
