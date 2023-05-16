import { createStore } from 'vuex'

export default createStore({
  state: {
    homeTasks: [{"id":2,"title":"Начало","author":"horex","shortDescription":"Знакомство с BornToCode","fullDescription":"Попробуй написать простой калькулятор двух чисел","codeExample":"1+1=2"},{"id":3,"title":"Жаба скрипт","author":"horex","shortDescription":"Попробуй решить сложную задачку","fullDescription":"Нужно реализовать проверку возраста человека по его дате рождения","codeExample":"25.09.2002"},{"id":4,"title":"Миша и Корова","author":"horex","shortDescription":"Нужно подружить Мишу и Корову","fullDescription":"Нужно сделать так чтобы Миша и Корова подружились и танцевали в хедере","codeExample":"misha.friend = korova;"}],
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
