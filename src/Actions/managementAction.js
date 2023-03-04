export const getData=(value)=>{
    
    return{
        type:"GETALLDATA",
        payLoad:value
    }
}

export const deleteItem=(itemId)=>{

  return{
    type:"DELETEITEM",
    payLoad:itemId
  }
}
export const editItem=(newObj)=>{
  return{
    type:"EDITITEM",
    payLoad:newObj
  }
};


// Action In The Case When user is leaving and need to empty the Store------------->
export const emptyStore=()=>{
    return{
        type:"EMPTYSTORE"
    }
}