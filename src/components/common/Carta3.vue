<template>
  <div class="box-container">
    <div class="box-item">
      <div class="flip-box">
        <div class="flip-box-front " style="background-image: url('https://i.postimg.cc/8CsRnzmC/654-6549114-blue-vegan-leather-customizable-planner-cover-diary-hd-preview-rev-1.png');">
          <div class="inner color-white">
            <h3 class="flip-box-header text-center">{{f}}</h3>
            <h3 class="flip-box-header2 text-center">{{a}}</h3>
            
          </div>
        </div>
        <div class="flip-box-back " style="background-image: url('https://i.postimg.cc/pTXgS81F/Untitled-1.jpg');">
          <div class="inner color-white">
            <h3 class="flip-box-header">DETALLES:</h3>
            <h3 class="flip-box-header2">{{description}}</h3>
            
          
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
  
  </template>
  <script>
        export default {
          data() {
      return {
        
        hoverText: "Marcar como En Progreso "
      };
    },props: {
      name: {
            type: String,
            required: true,
          },
         d: {
            type: String,
            required: true,
          },
          a: {
            type: String,
            required: true,
          },
          b: {
            type: String,
            required: true,
          },
          c: {
            type: String,
            required: true,
          },
          d: {
            type: String,
            required: true,
          },
          e: {
            type: String,
            required: true,
          },
          f: {
            type: String,
            required: true,
          },
          g: {
            type: String,
            required: true,
          },
          h: {
            type: String,
            required: true,
          },
          description: {
          type: String,
          required: true,
        },
          },
          methods: {
          handleChange(value) {
              console.log('Nuevo estado:', value);
              // Aquí puedes realizar cualquier acción adicional con el nuevo estado seleccionado
          },
          methods: {
          handleChange(value) {
              console.log('Nuevo estado:', value);
              // Aquí puedes realizar cualquier acción adicional con el nuevo estado seleccionado
          },
              JhessPayasita(){
                  alert("PAYASA");
              }
          }
        }};
        </script>
  <style scoped>
  
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  .text-center {
    position: relative;
    left: 20px;
    
  }
  
  .color-white {
    color: #ffffff;
  }
  
  .box-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 35px 15px;
    width: 100%;
  }
  
  @media screen and (min-width:1380px) {
    .box-container {
      flex-direction: row
    }
  }
  
  .box-item {
    position: relative;
    width: 415px;
    margin-bottom: 35px;
    max-width: 100%;
  }
  
  .flip-box {
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    perspective: 1000px;
    -webkit-perspective: 1000px;
  }
  
  .flip-box-front,
  .flip-box-back {
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    min-height: 475px;
    -ms-transition: transform 0.7s cubic-bezier(.4,.2,.2,1);
    transition: transform 0.7s cubic-bezier(.4,.2,.2,1);
    -webkit-transition: transform 0.7s cubic-bezier(.4,.2,.2,1);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    margin: 10px;
  }
  
  .flip-box-front {
    -ms-transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  
  .flip-box:hover .flip-box-front {
    -ms-transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    -webkit-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  
  .flip-box-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    
    -ms-transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  
  .flip-box:hover .flip-box-back {
    -ms-transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  
  .flip-box .inner {
    position: absolute;
    left: 0;
    width: 100%;
    padding: 60px;
    outline: 1px solid transparent;
    -webkit-perspective: inherit;
    perspective: inherit;
    z-index: 2;
    
    transform: translateY(-50%) translateZ(60px) scale(.94);
    -webkit-transform: translateY(-50%) translateZ(60px) scale(.94);
    -ms-transform: translateY(-50%) translateZ(60px) scale(.94);
    top: 50%;
  }
  
  .flip-box-header {
    font-size: 34px;
  }
  .flip-box-header2 {
    font-size: 24px;
  }
  
  .flip-box p {
    font-size: 20px;
    line-height: 1.5em;
  }
  
  .flip-box-img {
    margin-top: 25px;
  }
  
  .flip-box-button {
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    margin-top: 25px;
    padding: 15px 20px;
    text-transform: uppercase;
  }
  </style>