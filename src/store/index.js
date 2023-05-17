import vuex from 'vuex'
import axios from 'axios';

export default new vuex.Store({
  state: {
    homeTasks: [],
    authorized: false,
    startIndex: 0,
    endIndex: 0,
    loader: false
  },
  getters: {
    getTask: (state) => (id) => {
      return state.homeTasks.find(t => t.id == id);
    }
  },
  mutations: {
  },
  actions: {
    async verifySignIn() {
      try {
        this.state.loader = true;

        await axios({
          method: "post",
          url: "/users/verifySignIn",
          withCredentials: true
        }).then((response) => {
          if (response.status == 200)
            this.state.authorized = true;
          else {
            this.state.authorized = false;
          }
        });

        this.state.loader = false;
      }
      catch (error) {
        this.state.authorized = false;
        this.state.loader = false;

        console.log(error);
      }
    },
  },
  modules: {
  }
})
