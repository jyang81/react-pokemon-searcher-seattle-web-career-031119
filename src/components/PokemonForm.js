import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.setState({
      name: ev.target.elements.name.value,
      hp: ev.target.elements.hp.value,
      frontUrl: ev.target.elements.frontUrl.value,
      backUrl: ev.target.elements.backUrl.value
    })
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: ev.target.elements.name.value,
        stats: [
          {
            value: ev.target.elements.hp.value,
            name: 'hp'
          }
        ],
        sprites: {
          front: ev.target.elements.frontUrl.value,
          back: ev.target.elements.backUrl.value
        }
      })
    })
      .then(resp => resp.json())
      .then(pokemon => this.props.addPokemon(pokemon))
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
