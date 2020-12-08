import React from 'react';
import Ratings from './Ratings.jsx';

import styles from './css/RelatedPurchase.module.css';

class RelatedPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleItemChange(this.props.data.id);
    this.props.resetStackPosition();
  }

  render() {
    return (
      <div className={styles.relatedPurchase}>
        <ul>
          <li><a href={`/${this.props.data.id}`}><img src={this.props.data.image_url} alt="image of a guitar" data-testid="relatedPurchaseImg"/></a></li>
          <li><a href={`/${this.props.data.id}`} data-testid="relatedPurchaseTitle">{this.props.data.title}</a></li>
          <li data-testid="relatedPurchaseCost">${this.props.data.price}</li>
          <li><a href={`/${this.props.data.id}`}><Ratings id={this.props.data.id} count={this.props.data.ratings_count} average={this.props.data.ratings_average}/></a></li>
        </ul>
      </div>
    );
  }
}

export default RelatedPurchase;