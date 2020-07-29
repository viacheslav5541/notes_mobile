import { observable, action } from 'mobx';
import axios from 'axios'
import './commonStore'
import commonStore from './commonStore';

class AuthStore {
    @observable inProgress = false;
    @observable isLogined = false;
    @observable loginError = null;
    @observable registerError = null;


    @observable values = {
      email: '',
      password: '',
    };

    @action setEmail(email) {
      this.values.email = email;
    }

    @action setPassword(password) {
      console.log(password)
      this.values.password = password;
    }

    @action reset() {
      this.loginError = null;
      this.registerError = null;
    }


    @action login() {
      this.inProgress = true;
      this.errors = undefined;
      return axios.post('http://localhost:3000/api/Users/login',{email: this.values.email, password: this.values.password})
        .then((res) => commonStore.setToken(res.data.id))
        .then(action(() => {
          this.isLogined = true; 
          this.loginError = null
        }))
        .catch(action((err) => {
          if(err.response.status == 401 || err.response.status == 400 ) {
            this.loginError = 'Неверный логин или пароль'
          } else this.loginError = 'Ошибка соединения с сервером'
        }))
        .finally(action(() => { this.inProgress = false;}));
    }

    @action register() {
      this.inProgress = true;
      this.errors = undefined;
      return axios.post('http://localhost:3000/api/Users', {email: this.values.email, password: this.values.password})
        .then(action(() => {
          this.registerError = null;
          this.values.password = '';
        }))
        .catch(action((err) => {
          if(err.response.status == 401 || err.response.status == 422 || err.response.status == 400) {
            this.registerError = 'Логин или пароль введены неправильно'
          } else this.registerError = 'Ошибка соединения с сервером'
        }))
        .finally(action(() => this.inProgress = false));
    }

    @action logout() {
      this.isLogined = false;
      this.values.password = '';
      this.loginError = null;
      this.registerError = null;
      commonStore.setToken('');
      return Promise.resolve();
    }
  }

export default new AuthStore();
