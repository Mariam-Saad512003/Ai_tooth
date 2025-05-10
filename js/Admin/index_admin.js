document.addEventListener('DOMContentLoaded', () => {
    const authService = new AuthService('http://aidentify-gradutionff.runasp.net/api');
  
    if (!authService.isAuthenticated()) {
      alert('You must be logged in to access this page.');
      window.location.href = 'login.html';
      return;
    }
  
    // Proceed with fetching protected resources using authService.getToken()
  });
  