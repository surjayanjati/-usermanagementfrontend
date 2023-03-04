const initalData=[];

export const managementReducer=(state=initalData,Action)=>{
    switch (Action.type) {
        case "GETALLDATA":
            const dataArray=Action.payLoad;
            
             return dataArray;
            break;
         case "DELETEITEM":
            const itemId=Action.payLoad;
            const newArray=state.filter((elem)=>elem.itemId!==itemId);
            return newArray;   
    
        default:
            return state;
            break;
    }
}