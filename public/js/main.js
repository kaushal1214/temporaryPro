var canvas = document.getElementById('target');
if(canvas){
    let form = document.getElementById("canvasFingerprint");
    form.value = canvas.toDataURL("image/png",0.5).split("base64,")[1].toString();
}

function changeFocus(id){
    if(document.getElementById(`securitycode${id-1}`).value.length>0)
    document.getElementById(`securitycode${id}`).focus();
}
