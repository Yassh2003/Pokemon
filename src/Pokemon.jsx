import { useEffect, useState } from "react";
import "./index.css"
import PokemonCards from "./PokemonCards";

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrror] = useState(null);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=1024";

    const fetchPokemon = async ()=> {
        try {
            const res = await fetch(API);
            const data = await res.json();

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url);
                const data = await res.json();
                return data;
            })

            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            setLoading(false);
            setErrror(err);
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

    if(loading){
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );
    }

    if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        );
    }

    return (
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div>
                    <ul className="cards">
                        {
                            pokemon.map((currPokemon)=>{
                                return <PokemonCards key={currPokemon.id} pokemonData={currPokemon}/>;
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}