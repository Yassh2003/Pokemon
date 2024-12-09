import { useEffect, useState } from "react";
import "./index.css"
import PokemonCards from "./PokemonCards";

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

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
            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

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