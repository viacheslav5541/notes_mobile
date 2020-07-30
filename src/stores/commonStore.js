import { observable, action, reaction } from 'mobx';
import axios from 'axios';

class CommonStore {

  @observable token = null;
  @observable notes = [];
  @observable isLoadingNotes = false;

  constructor() {
  }


  @action getNotes(){
    this.isLoadingNotes = true;
    axios.get(`http://localhost:3000/api/tasks?access_token=${this.token}`)
    .then(action((res) => {
      this.notes = res.data;
      this.isLoadingNotes = false;
    }))
    .catch(() => this.isLoadingNotes = false )
  }

  @action changeNote(note,index){
    console.log(note,index)
    this.isLoadingNotes = true;
    return axios.put('http://localhost:3000/api/tasks', note, { headers: { authorization:this.token } })
    .then(action((res) => {
      this.isLoadingNotes = false;
      this.notes[index] = note;
    }))
    .catch(() => this.isLoadingNotes = false)
  }

  @action addNote(){
    return axios.post(`http://localhost:3000/api/tasks`,{title: ' ', body: ' ', done: false}, {headers: { authorization:this.token }})
    .then(action((res) => {
      this.notes.push({title:' ',body:' ',done:false,id:res.data.id});
      return res.data;
     }))
  }

  @action setToken(token) {
    this.token = token;
  }

  @action deleteNote(id){
    return axios.delete(`http://localhost:3000/api/tasks/${id}`, { headers: { authorization: this.token }})
    .then(action(() => {
      this.notes = this.notes.filter(item => { return item.id != id })
    }))
  }

}

export default new CommonStore();
