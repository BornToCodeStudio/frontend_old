import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [],
    authorized: false,
    startIndex: 0,
    endIndex: 0,
  },
  getters: {
    getTask: (state) => (id) => {
      return state.homeTasks.find(t => t.taskId === id);
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
