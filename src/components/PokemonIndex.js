import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      value: ''
    }

    this.getPokemon()
  }

  getPokemon = () => {
    let url = 'http://localhost:3000/pokemon'
    fetch(url)
    .then(res => res.json())
    .then(pokemons => {
      this.setState({
        pokemons: pokemons,
        filteredPokemons: pokemons
      })
    })
  }

  handleSearchChange = (ev, {value}) => {
    console.log({value})
    this.setState({value})
    setTimeout(() => {
      let array = this.state.pokemons.filter(p => {
        return p.name.includes(value)
      })
      this.setState({
        filteredPokemons: array
      })
    }, 300)
  }

  addPokemon = (pokemon) => {
    this.setState({
      pokemons: [pokemon, ...this.state.pokemons],
      filteredPokemons: [pokemon, ...this.state.filteredPokemons]
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection
          filteredPokemons={this.state.filteredPokemons}
          pokemons={this.state.pokemons}
        />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
