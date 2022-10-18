
const defaultState = {
    currentPlayMusic:{},
    playStatus:false,
    
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case 'changePlayMusic' :
            return {...state,currentPlayMusic:action.value}
        case 'changePlayStatus' :
            return {...state,playStatus:action.value}
        default:
            return state
    }
}