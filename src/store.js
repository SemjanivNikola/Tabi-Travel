import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      userData: [],
      isActive: false,
      registration_errors: [],
      errorInfo: false
  },
  mutations: {
    addErrorToList (state, error) {
      state.registration_errors.push(error);
      alert(state.registration_errors);
    }
  },
  actions: {
      fillErrorList ({ commit }, error) {
          commit('addErrorToList', error);
      }

  }
})
