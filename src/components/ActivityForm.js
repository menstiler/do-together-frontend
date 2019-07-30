import React from 'react'

export default class ActivityForm extends React.Component {
  state = {
    title: '',
    location: '',
    icon: '',
    image: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { title, location, icon, image } = this.state
    debugger
    return (
      <div style={{paddingTop: "1%"}}>
        <form onSubmit={(event) => {
          this.props.addNewActivity(event, title, location, icon, image, this.props.group_id)
          this.props.hideActivityForm()
        }}>
          <h2>Add New Activity</h2>
          <h3>Title:</h3>
          <div className="ui input">
            <input type="text" name="title" value={title} onChange={this.handleChange} placeholder="Title" />
          </div>
          <h3>Location:</h3>
          <div className="ui input">
            <input type="text" name="location" value={location} onChange={this.handleChange} placeholder="Location" />
          </div>
          <h3>Choose Category:</h3>
              <select class="ui compact menu" name="icon" value={this.state.icon} onChange={this.handleChange}>
                <option class="item" value="">Choose a Category:</option>
                <option class="item" value="baseball">Sport</option>
                <option class="item" value="utensils">Food</option>
                <option class="item" value="plane">Travel</option>
                <option class="item" value="laptop">Tech</option>
                <option class="item" value="chess">Game</option>
                <option class="item" value="coffee">Social</option>
                <option class="item" value="beer">Party</option>
              </select>
              <h3>Choose Image</h3>
              <select class="ui compact menu" name="image" value={this.state.image} onChange={this.handleChange}>
                <option class="item" value="">Choose an Image:</option>
                <option class="item" value="sports">Sport</option>
                <option class="item" value="food">Food</option>
                <option class="item" value="travel">Travel</option>
                <option class="item" value="tech">Tech</option>
                <option class="item" value="game">Game</option>
                <option class="item" value="social">Social</option>
                <option class="item" value="beer">Party</option>
              </select>
          <div style={{paddingTop: "1%"}}>
            <input type="submit" value="Create New Activity" className="ui primary button" />
          </div>
        </form>
      </div>
    )
  }
}
