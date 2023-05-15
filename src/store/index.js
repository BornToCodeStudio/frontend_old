import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [],
    authorized: false,
    startIndex: 0,
    endIndex: 0,
    loader: false
  },
  getters: {
    getTask: (state) => (id) => {
      return state.homeTasks.find(t => t.id === id);
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
