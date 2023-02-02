let UserModule:Object={
    namespaced: true,
    state: {
        user: {
            name: "",
            psd:"",
            token: ""
        }
    },
    mutations: {
        setUser(state: { user: any; }, user: any) {
            state.user = user;
        }
    }
}

export default UserModule;