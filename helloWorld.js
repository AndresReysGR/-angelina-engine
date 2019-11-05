const canvas= document.getElementById('glcanvas');

// Vertex shader program

const vsSource = `
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;

const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

const loadShader = (gl, type, source)=>{
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}



const initShader =(gl,vsSource, fsSource)=>{
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
  const shaderProgram = gl.createProgram();

  //SE agrego un shader attach
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  
  //ya esta, el vertex y el program, este se liga, para que el OPGl, para ienviar informacion cargada.
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}

const initBuffers= gl =>{
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = [
        -1.0,  1.0,
         1.0,  1.0,
        -1.0, -1.0,
         1.0, -1.0,
      ];
      gl.bufferData(gl.ARRAY_BUFFER, 
                    new Float32Array(positions),
                    gl.STATIC_DRAW);
       return {
         position: positionBuffer,
         };                          
}

const drawScene = (gl, programInfo, buffers)=>{
  gl.clearColor(0.0, 0.0, 0.0, 1.0); 
  gl.clearDepth(1.0); //sirve para borrar todo
  gl.enable(gl.DEPTH_TEST); // habilita la profundidad, habilita para colocar capas o colcoar un obejeto sobre otro,
  gl.depthFunc(gl.LEQUAL);   //obscuresimiento de las cosas , lo que estras de un objeto, lo obsucurese, es decir, se sobre pone.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //limpiar los buffer(Capas)

}

const main = ()=>{
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
      }
      const shaderProgram =initShader(gl, vsSource, fsSource)

      //informacion  basica
      const programInfo ={
        program : shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram,'aVertexPosition'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uPojectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },


      };
      
      const buffers = initBuffers(gl);

      drawScene(gl, programInfo, buffers);

      //Esto se tiene que aprender si o si
      //agrega el color con el que se limpia
     // gl.clearColor(0, 0, 0, 1);
      //Este limpia
      gl.clear(gl.COLOR_BUFFER_BIT);
}


window.onload = main;

/*Sheider se parece mas al c que al c++. no nos vamos a meter harcaro al respecto, 
oslo vamos a copiar un sheider la respecto
idican como se hara el sombreado el colorado de algo
el paradigma que mas se usa para el sheider es el "lamber"= una iluminacion sombre eel sombreado sobre algo
una luz, la direccion o el angulo odne se posisona, depende de "lightdirection" y las nomrlaes de un objetof*/