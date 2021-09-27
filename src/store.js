import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            name: "",
            email: "",
            role_id: "",
        }
    },
    mutations: {
        updateName(state, newName) {
            state.name = newName;
        },
        updateEmail(state, newEmail) {
            state.email = newEmail;
        },
        updateRoleID(state, newRoleID) {
            state.role_id = newRoleID;
        },
        login(state, newEmail, newName, newRoleID) {
            state.name = newName;
            state.email = newEmail;
            state.role_id = newRoleID;
        },
        logout(state) {
            state.name = "";
            state.email = "";
            state.role_id = "";
        }
    },
    getters: {
        getName(state) {
            return state.name;
        },
        getEmail(state) {
            return state.email;
        },
        getRoleID(state) {
            return state.role_id;
        },
    }
})

export default store