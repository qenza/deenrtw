// Add interactivity if needed. For example, navigation on clicking the back button:
document.querySelector('.back-button').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Going back to the previous page!');
    window.location.href = 'homepage.html';
  });
  