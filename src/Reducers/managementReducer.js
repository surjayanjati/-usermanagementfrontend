const initalData=[];

export const managementReducer=(state=initalData,Action)=>{
    switch (Action.type) {
        case "GETALLDATA":
            const dataArray=Action.payLoad;
            
             return dataArray;
            break;
    
        default:
            return state;
            break;
    }
}