export function DivDePokemon({name, front_default}){
    return(
        <>
            <div className="col col-md-2" id="articulo">
                <h4>{name}</h4>
                <img src={front_default}/>
                <p><button id={name}>CHAT</button></p>
                <p><button id={"like" + name}>LIKE</button></p>			
            </div>	
        </>
    )
}