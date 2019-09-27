const state = {
    name: "iPhone11",
    count: 2,
    price: '9999',
    mount: '19998'
}

const getters = {
    getName(state){
        return state.name;
    },
    getCount(state){
        return state.count;
    },
    getPrice(state){
        return state.count;
    },
    getMount(state){
        return state.mount;
    }
}

const mutations = {
    setName(state, value){
        state.name = value;
    },
    setAge(state, value){
        state.age = value;
    },
    setPrice(state, value){
        state.price = value;
    },
    setMount(state, value){
        state.mount = value;
    }
}

const actions = {
    asyncSetName(context, value){
        context.commit("setName", value);
    },
    asyncSetAge(context, value){
        context.commit("setAge", value);
    },
    asyncSetPrice(context, value){
        context.commit("setPrice", value);
    },
    asyncSetMount(){
        context.commit("setMount", value);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}