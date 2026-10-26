const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  const words = typingElement.dataset.words.split(',');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    typingElement.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex += 1;
      setTimeout(type, 90);
    } else if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 55);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, 1000);
    }
  }

  type();
}
