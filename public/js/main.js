function changeFocus(id){
    if(document.getElementById(`securitycode${id-1}`).value.length>0)
    document.getElementById(`securitycode${id}`).focus();
}
