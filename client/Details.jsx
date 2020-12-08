import React from 'react';
import ReactDOM from 'react-dom';

import styles from './css/Details.module.css';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('inside of Details component', this.props.details);
    return (
      <div className={styles.details}>
        <div className={styles.detailsRow}>
          <h3>Coverage</h3>
          <p>{this.props.details.coverage}</p>
        </div>
        <div className={styles.detailsRow}>
          <h3>Overview</h3>
          <p>{this.props.details.overview}</p>
        </div>
        <div className={styles.detailsRow}>
          <h3>Specifications</h3>
          <p>{this.props.details.specifications}</p>
        </div>
      </div>
    );
  }
}

export default Details;