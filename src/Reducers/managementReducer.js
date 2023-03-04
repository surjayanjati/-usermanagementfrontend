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
        case "EDITITEM":
            let dataAfterRemovingTheEditedOne=state.filter((elem)=>elem.itemId!==Action.payLoad.id);
            console.log("hi");
            console.log(dataAfterRemovingTheEditedOne);
                dataAfterRemovingTheEditedOne.push(Action.payLoad);
                return dataAfterRemovingTheEditedOne;
                case "EMPTYSTORE":
                    return [];        
        default:
            return state;
            break;
    }
}