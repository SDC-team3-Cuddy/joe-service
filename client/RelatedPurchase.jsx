import React from 'react';
import Ratings from './Ratings.jsx';

class RelatedPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleItemChange(this.props.data.id);
  }

  render() {
    return (
      <div className="relatedPurchase">
        <ul>
          <li><a href="/" onClick={this.handleClick}><img src={this.props.data.image_url} alt="image of a guitar"/></a></li>
          <li><a href="/" onClick={this.handleClick}>{this.props.data.title}</a></li>
          <li>${this.props.data.cost}</li>
          <li><Ratings id={this.props.data.id}/></li>
        </ul>
      </div>
    );
  }
}

export default RelatedPurchase;