import AuthService from "../../utils/auth-service";

const Login = {
  async render() {
    return `
    <div class="login-container">
      <img src="app-title.png">
      <form class="login-form">
        <h2>LOGIN</h2>
        <div class="input-user">
          <input id="username" placeholder="Username" autocomplete="off"/>
          <input id="password" type="password" placeholder="Password"/>
        </div>
        <button role="button" id="btn-login">LOGIN</button>
      </form>
      <div class="signup-offer">
        <p>Belum memiliki akun?</p>
        <button>SIGN UP</button>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const btnLogin = document.getElementById('btn-login');
    btnLogin.addEventListener('click', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const authUser = new AuthService;
      authUser.login(username, password);

      if (authUser.isLoggedIn) {
        window.location.href = "/";
      }

    })
  },
};

export default Login;