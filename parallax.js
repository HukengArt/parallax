//****various jshint configs****
// jshint esversion: 8
// jshint browser: true
// jshint node: true
// jshint -W117
"use strict";

const WIDTH = 499;
const HEIGHT = 600;
const MAX_DISP = 30;

var canvas;
var ctx;
var mouse_pos;

var slices = []; // change this and pass to get_layers() to load new page
var layers = [];

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    canvas = document.getElementById('display');
    ctx = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
    mouse_pos = [0,0];

    slices = ['slice0.png',
              'slice1.png',
              'slice2.png',
              'slice3.png',
              'slice4.png',
              'slice5.png',
              'slice6.png',
              'slice6.png',
              'slice7.png',
              'slice8.png',
              'slice9.png'
            ];

    layers = get_layers(slices);

    document.addEventListener("mousemove", function(e) {

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillRect(0,0,canvas.width,canvas.height);

      mouse_pos = [e.x, e.y];

      for (let i = 0; i < layers.length; i++) {
        ctx.drawImage(layers[i],
                      MAX_DISP * (i+1-slices.length/2)/slices.length * ((mouse_pos[0] - window.screen.width/2)/window.screen.width),
                      MAX_DISP * (i+1-slices.length/2)/slices.length * ((mouse_pos[1] - window.screen.height/2)/window.screen.height)
                     );
      }
    });
}


// set up Image objects for parallax layering
function get_layers(slices) {
  let layers = [];

  for (let i = 0; i < slices.length; i++) {
    let current_frame = new Image();
    current_frame.src = slices[i];
    layers.push(current_frame);
  }

  return layers;
}
