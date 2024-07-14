class AuthService {
  constructor() {
    this._loggedIn = false;
  }

  login(username, password) {
    if (username === 'abc' && password === '123') {
      sessionStorage.setItem('userInfo', JSON.stringify({
        username: username,
        password: password,
        lastLogin: new Date().toISOString(),
      }))
    } else {
      console.log('login failed.');
    }
  }

  register(username, password) {
    console.log(username, password);
  };

  logout() {
    sessionStorage.removeItem('userInfo');
    window.location.href = '#/login';
  }

  isLoggedIn() {
    return sessionStorage.getItem('userInfo');
  }
}

export default AuthService;