import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            name: "",
            email: "",
        }
    },
    mutations: {
        updateName(state, newName) {
            state.name = newName;
        },
        updateEmail(state, newEmail) {
            state.email = newEmail;
        },
        login(state, newEmail, newName) {
            state.name = newName;
            state.email = newEmail;
        },
        logout(state) {
            state.name = "";
            state.email = "";
        }
    },
    getters: {
        getName(state) {
            return state.name;
        },
        getEmail(state) {
            return state.email;
        },
    }
})

export default store