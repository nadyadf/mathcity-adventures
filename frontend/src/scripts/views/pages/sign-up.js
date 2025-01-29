import AuthService from "../../utils/auth-service";

const SignUp = {
  async render() {
    return `
      <div class="auth-container">
        <img class="app-title" src="app-title.png">
        <form class="form-wrapper sign-up">
          <h2>SIGN UP</h2>
          <div class="input-user">
          <input type="text" id="identityNumber" placeholder="Nomor Identitas" autocomplete="off" required/>
          <input id="password" type="password" placeholder="Kata Sandi" required/>
          <input id="passwordConfirm" type="password" placeholder="Konfirmasi Kata Sandi" required/>
          </div>
          <button role="button" id="btn-sign-up">SIGN UP</button>
        </form>
        <div class="signup-offer">
          <p>Sudah memiliki akun?</p>
          <button id="go-to-login">LOG IN</button>
        </div>
        <img class="signup-offer__illustration" src="adventure-illustration2.png">
      </div>
    `;
  },

  async afterRender() {
    const signUpForm = document.querySelector('.form-wrapper.sign-up');
    const btnSignUp = document.querySelector('#btn-sign-up');
    btnSignUp.addEventListener('click', async (e) => {
      e.preventDefault();

      const identityNumberValue = signUpForm.querySelector('#identityNumber').value;
      const passwordValue = signUpForm.querySelector('#password').value;
      const passwordConfirmValue = signUpForm.querySelector('#passwordConfirm').value;
      if (!signUpForm.checkValidity()) {
        return alert('Semua kolom harus terisi');
      }
      await AuthService.signUp(identityNumberValue, passwordValue, passwordConfirmValue);      
    });

    const goToLogInBtn = document.querySelector('#go-to-login');
    goToLogInBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = '#/login';
    });
  },
};

export default SignUp;