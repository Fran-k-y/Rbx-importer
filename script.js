let mode="local";
let output="";

// ---------------- PARTICLES ----------------
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

let p=[];

for(let i=0;i<50;i++){
p.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5)
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<p.length;i++){
let o=p[i];
o.x+=o.vx;
o.y+=o.vy;

if(o.x<0||o.x>canvas.width)o.vx*=-1;
if(o.y<0||o.y>canvas.height)o.vy*=-1;

ctx.fillStyle="#7c3aed";
ctx.fillRect(o.x,o.y,2,2);
}

requestAnimationFrame(animate);
}
animate();

// ---------------- FILE ----------------
const fileInput=document.getElementById("fileInput");
const status=document.getElementById("status");

fileInput.onchange=e=>{
handleFile(e.target.files[0]);
};

document.getElementById("dropZone").ondragover=e=>{
e.preventDefault();
};

document.getElementById("dropZone").ondrop=e=>{
e.preventDefault();
handleFile(e.dataTransfer.files[0]);
};

function handleFile(file){
if(!file)return;

status.innerText="Loading "+file.name;

let reader=new FileReader();

reader.onload=function(e){

let data=new Uint8Array(e.target.result);

// SIMPLE SAFE OUTPUT (GitHub version base)
let text="-- Voxenify Output\n\n";
text+="-- File: "+file.name+"\n\n";

text+="local model = Instance.new('Model')\n";
text+="model.Name = '"+file.name+"'\n\n";

for(let i=0;i<Math.min(30,data.length);i++){
text+="-- byte "+i+": "+data[i]+"\n";
}

text+="\nreturn model";

output=text;
document.getElementById("output").value=output;

status.innerText="Converted (GitHub Lite)";
};

reader.readAsArrayBuffer(file);
}

function copyOut(){
navigator.clipboard.writeText(output);
alert("Copied!");
}
