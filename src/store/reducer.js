
const defaultState = {
    currentPlayMusic:{},
    playStatus:false,
    playList:[]
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case 'changePlayMusic' :
            return {...state,currentPlayMusic:action.value}
        case 'changePlayStatus' :
            return {...state,playStatus:action.value}
        case 'setPlayList' :
            return {...state,playList:action.value}
        default:
            return state
    }
}