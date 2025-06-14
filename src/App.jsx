import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import React, {useEffect} from "react";

function App() {

  useEffect(() => {
    let numpag = 1
    const pagina = document.getElementById("pagina")
    pagina.innerHTML = `<p>Página ${numpag}</p>`

    let offset = 0
    let limit = 12

    const contenedor = document.getElementById("contenedor")
    const contenedor_chat = document.getElementById("contenedor_chat")

    const buttonpagsgte = document.getElementById("buttonpagsgte")
    const buttonpagant = document.getElementById("buttonpagant")
    const buttonasc = document.getElementById("buttonasc")
    const buttondesc = document.getElementById("buttondesc")

    document.getElementById("buttonpagsgte").onclick = function pagsgte(){
        numpag = numpag + 1
        contenedor.innerHTML = "" //inner va con minuscula
        pagina.innerHTML = `<p>Página ${numpag}</p>`

        buttondesc.disabled = false
        buttonasc.disabled = false
        buttonpagsgte.disabled = true //para prevenir que se apriete el botón muy rápido y se renderizen más pokemon de lo debido
        offset = offset + limit
        obtenerpost()

        //botón se reactiva despues de 250 milisegundos
        setTimeout(()=>{
            buttonpagsgte.disabled = false
        }, 500) //1000 milisegundos son 1 segundo
    }

    document.getElementById("buttonpagant").onclick = function pagant(){
        if(offset >= limit){
            numpag = numpag - 1
            contenedor.innerHTML = ""
            pagina.innerHTML = `<p>Página ${numpag}</p>`

            buttondesc.disabled = false
            buttonasc.disabled = false
            buttonpagant.disabled = true
            offset = offset - limit
            console.log(offset)

            obtenerpost()

            setTimeout(()=>{
                buttonpagant.disabled = false
            },250)
        }  
    }

    //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10277 //máximo de pokemones

    async function obtenerpost(){
        try{
            contenedor.innerHTML = "" //NO PREVIENE QUE SE CARGEN MÁS POKEMONES DE LO QUE SE DEBE AL PRESIONAR RÁPIDO EK BOTÓN DE PÁGINA SGTE
            //https://pokeapi.co/api/v2/pokemon/?offset=50&limit=50 offset 50 parte desde el objeto 51
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`) //se puede pasar el offset como variable js
            const datos = await respuesta.json()
            
            datos.results.forEach((pokemon) => {
                async function obtenerpostpokemon(){
                    //const respuesta2 = await fetch("https://pokeapi.co/api/v2/pokemon/1/") //con este si funciona
                    const respuesta2 = await fetch(`${pokemon.url}`) //colocar ` ` en lugar de " ", o sino aparece error CORS
                    const datospokemon = await respuesta2.json()
                    contenedor.innerHTML +=
                    `
                        <div class="col col-md-2" id="articulo">
                                <h4>${pokemon.name}</h1>
                                <img src="${datospokemon.sprites.front_default}">
                                <p><button id="${pokemon.name}">CHAT</button></p>
                                <p><button>LIKE</button></p>			
                        </div>			
                    `
                    setTimeout(()=>{
                        const chat = document.getElementById(`${pokemon.name}`) //cuando se ingresa varialbe como parametro de funciones, estas se ponen entre ` `, no entre " "
                        chat.style.backgroundColor = "blue"
                        chat.style.color = "white"
                        chat.onclick = function abrirchat(){
                            let habilidades = []
                            let movimientos = []
                            let estadisticas = []
                            let valores_base_estadisticas = []

                            datospokemon.abilities.forEach((abilities)=>{
                                habilidades.push(abilities.ability.name)
                                console.log(habilidades)
                            })        
                            datospokemon.moves.forEach((moves)=>{
                                movimientos.push(moves.move.name)
                            })                      
                            datospokemon.stats.forEach((stats)=>{
                                estadisticas.push(stats.stat.name)
                            })       
                            datospokemon.stats.forEach((stats)=>{
                                valores_base_estadisticas.push(stats.base_stat)
                            })
                            contenedor_chat.innerHTML = ""
                            contenedor_chat.innerHTML += 
                            `
                                <div class="row">
                                    <div class="col col-md-4">
                                        <h3>Chat de ${pokemon.name}</h3>
                                        <input id="txb" type="text" placeholder="Pregunta algo" style="align-items: center;">    
                                            <button id="btn">Preguntar</button>
                                    </div>
                                    <div class="col col-md-8">
                                        <textarea id="txa" style="width: 30rem; height: 5rem; resize: none;" placeholder="Respuesta del chat" disabled></textarea>
                                    </div>
                                </div>
                            `
                        }
                    },100)
                    
                }
                obtenerpostpokemon()
            })

            const buttonasc = document.getElementById("buttonasc")
            const buttondesc = document.getElementById("buttondesc")

            buttonasc.onclick = function ordenarasc(){
                buttonasc.disabled = true
                buttondesc.disabled = false
                const listanombres = []
                datos.results.forEach((pokemon) => {
                    listanombres.push(pokemon.name) //push() es para añadir elementos al final del arreglo
                })
                listanombres.sort()

                contenedor.innerHTML = ""
                
                listanombres.forEach((nombre) => {
                    datos.results.forEach((pokemon) => {
                        if(pokemon.name == nombre){
                            async function obtenerpostpokemon(){
                                const respuesta2 = await fetch(`${pokemon.url}`)
                                const datospokemon = await respuesta2.json()
                                contenedor.innerHTML +=
                                `
                                    <div class="col col-md-2" id="articulo">
                                            <h4>${pokemon.name}</h1>
                                            <img src="${datospokemon.sprites.front_default}">
                                            <p><button id="${pokemon.name}">CHAT</button></p>
                                            <p><button>LIKE</button></p>			
                                    </div>					
                                `
                                setTimeout(()=>{
                                    const chat = document.getElementById(`${pokemon.name}`) //cuando se ingresa varialbe como parametro de funciones, estas so ponen entre ` `, no entre " "
                                    chat.style.backgroundColor = "blue"
                                    chat.style.color = "white"
                                    chat.onclick = function abrirchat(){
                                        let habilidades = []
                                        let movimientos = []
                                        let estadisticas = []
                                        let valores_base_estadisticas = []

                                        datospokemon.abilities.forEach((abilities)=>{
                                            habilidades.push(abilities.ability.name)
                                            console.log(habilidades)
                                        })        
                                        datospokemon.moves.forEach((moves)=>{
                                            movimientos.push(moves.move.name)
                                        })                      
                                        datospokemon.stats.forEach((stats)=>{
                                            estadisticas.push(stats.stat.name)
                                        })       
                                        datospokemon.stats.forEach((stats)=>{
                                            valores_base_estadisticas.push(stats.base_stat)
                                        })
                                        
                                    }
                                },100)
                            }
                            obtenerpostpokemon()
                        }
                    })
                })
            }

            buttondesc.onclick = function ordenardesc(){
                buttondesc.disabled = true
                buttonasc.disabled = false
                const listanombres = []
                datos.results.forEach((pokemon) => {
                    listanombres.push(pokemon.name) //push() es para añadir elementos al final del arreglo
                })
                listanombres.sort()
                listanombres.reverse()

                contenedor.innerHTML = ""
                
                listanombres.forEach((nombre) => {
                    datos.results.forEach((pokemon) => {
                        if(pokemon.name == nombre){
                            async function obtenerpostpokemon(){
                                const respuesta2 = await fetch(`${pokemon.url}`)
                                const datospokemon = await respuesta2.json()
                                contenedor.innerHTML +=
                                `
                                    <div class="col col-md-2" id="articulo">
                                            <h4>${pokemon.name}</h1>
                                            <img src="${datospokemon.sprites.front_default}">
                                            <p><button id="${pokemon.name}">CHAT</button></p>
                                            <p><button>LIKE</button></p>			
                                    </div>			
                                `
                                setTimeout(()=>{
                                    const chat = document.getElementById(`${pokemon.name}`) //cuando se ingresa varialbe como parametro de funciones, estas so ponen entre ` `, no entre " "
                                    chat.style.backgroundColor = "blue"
                                    chat.style.color = "white"
                                    chat.onclick = function abrirchat(){
                                        let habilidades = []
                                        let movimientos = []
                                        let estadisticas = []
                                        let valores_base_estadisticas = []

                                        datospokemon.abilities.forEach((abilities)=>{
                                            habilidades.push(abilities.ability.name)
                                            console.log(habilidades)
                                        })        
                                        datospokemon.moves.forEach((moves)=>{
                                            movimientos.push(moves.move.name)
                                        })                      
                                        datospokemon.stats.forEach((stats)=>{
                                            estadisticas.push(stats.stat.name)
                                        })       
                                        datospokemon.stats.forEach((stats)=>{
                                            valores_base_estadisticas.push(stats.base_stat)
                                        })
                                    }
                                },100)
                            }
                            obtenerpostpokemon()
                        }
                    })
                })
            }
        }
        catch(error){
            console.error("Ocurrió un error", error.Message)
        }
    }
    obtenerpost() //se renderiza primera pagina al inicio

    async function obtenerpostParaBuscar(){
        try{
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10277`) 
            const datos = await respuesta.json()

            document.getElementById("buttonbuscar").onclick = function buscarpokemon(){
                buttonbuscar.disabled = true
                let textbox = document.getElementById("textboxbuscar")
                console.log(textbox.value.toLowerCase())
                
                datos.results.forEach((pokemon) => {
                    if(pokemon.name == textbox.value.toLowerCase()){
                        async function obtenerpostpokemon(){
                            const respuesta2 = await fetch(`${pokemon.url}`)
                            const datospokemon = await respuesta2.json()
                            contenedor.innerHTML = ""
                            contenedor.innerHTML +=
                            `
                                <div class="col col-md-2" id="articulo">
                                        <h4>${pokemon.name}</h1>
                                        <img src="${datospokemon.sprites.front_default}">
                                        <p><button id="${pokemon.name}">CHAT</button></p>
                                        <p><button>LIKE</button></p>			
                                </div>				
                            `
                            setTimeout(()=>{
                                const chat = document.getElementById(`${pokemon.name}`) //cuando se ingresa varialbe como parametro de funciones, estas so ponen entre ` `, no entre " "
                                chat.style.backgroundColor = "blue"
                                chat.style.color = "white"
                                chat.onclick = function abrirchat(){
                                    let habilidades = []
                                    let movimientos = []
                                    let estadisticas = []
                                    let valores_base_estadisticas = []

                                    datospokemon.abilities.forEach((abilities)=>{
                                        habilidades.push(abilities.ability.name)
                                        console.log(habilidades)
                                    })        
                                    datospokemon.moves.forEach((moves)=>{
                                        movimientos.push(moves.move.name)
                                    })                      
                                    datospokemon.stats.forEach((stats)=>{
                                        estadisticas.push(stats.stat.name)
                                    })       
                                    datospokemon.stats.forEach((stats)=>{
                                        valores_base_estadisticas.push(stats.base_stat)
                                    })
                                }
                            },100)
                        }
                        obtenerpostpokemon()
                    }
                })
                setTimeout(()=>{
                    buttonbuscar.disabled = false
                },250)
            }
        }
        catch(error){
            console.error("Ocurrió un error", error.Message)
        }
    }
    obtenerpostParaBuscar()

  }, [])

  return (
    <>
      <div className="container-fluid">
          <div className="arriba">     
              <div className = "row">
                  <div className="col col-md-1">
                      <span>Buscar:</span>
                  </div>
                  <div className="col col-md-2">
                      <input type="text" placeholder="charizard" id="textboxbuscar" size="10rem"/> 
                  </div>
                  <div className="col col-md-3">
                      <button id="buttonbuscar">Buscar Pokemón</button>
                  </div>
                  <div className="col col-md-3">
                      <button id="buttondesc">Ordenar desc.</button>
                  </div>
                  <div className="col col-md-3">
                      <button id="buttonasc">Ordenar asc.</button>
                  </div>
              </div>
          </div>

          <div className="abajo">
              <div className = "row">
                  <div className="col col-md-6">
                      <button id="buttonpagant">Pág. anterior</button>
                  </div>
                  <div className="col col-md-6">
                      <button id="buttonpagsgte">Pág. siguiente</button>
                  </div>
              </div>
          </div>

          <div className = "row">
              <div className="col col-md-12">
                  <div id="pagina">
                  </div>
              </div>
          </div>

          <div id="contenedor_chat">
          </div>

          <div className="row" id="contenedor">
          </div>
      </div>
    </>
  )
}
export default App
