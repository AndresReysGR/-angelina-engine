const canvas= document.getElementById('glcanvas');

const main = ()=>{
    const gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
      }
      //Esto se tiene que aprender si o si
      //agrega el color con el que se limpia
      gl.clearColor(0, 0, 0, 1);
      //Este limpia
      gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;

/*Sheider se parece mas al c que al c++. no nos vamos a meter harcaro al respecto, 
oslo vamos a copiar un sheider la respecto
idican como se hara el sombreado el colorado de algo
el paradigma que mas se usa para el sheider es el "lamber"= una iluminacion sombre eel sombreado sobre algo
una luz, la direccion o el angulo odne se posisona, depende de "lightdirection" y las nomrlaes de un objetof*/