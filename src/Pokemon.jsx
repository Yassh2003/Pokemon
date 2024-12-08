import { useEffect } from "react";
import "./index.css"

export const Pokemon = () => {

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
            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

    return <>
    <h1>Pokemon App</h1>
    </>
}