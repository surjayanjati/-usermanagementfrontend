export const getData=(value)=>{
    
    return{
        type:"GETALLDATA",
        payLoad:value
    }
}

export const deleteItem=(itemId)=>{
   console.log(itemId);
    console.log(itemId);
  return{
    type:"DELETEITEM",
    payLoad:itemId
  }
}