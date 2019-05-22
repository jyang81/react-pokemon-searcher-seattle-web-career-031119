import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false
    }
  }

  toggleImage = (pokemon) => {
    console.log("toggle", pokemon)
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  render() {
    // console.log(this.props.pokemon)
    return (
      <Card onClick={() => this.toggleImage(this.props.pokemon)}>
        <div>
          <div className="image">
            <img
              src={this.state.isClicked ? this.props.pokemon.sprites.back : this.props.pokemon.sprites.front}
              alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(s => s.name === 'hp').value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
