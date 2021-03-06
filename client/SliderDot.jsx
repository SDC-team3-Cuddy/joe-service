import React from 'react';

import styles from './css/SliderDot.module.css';

class SliderDot extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleMove(null, this.props.index);
  }

  render() {
    let dot;
    if (this.props.stackPosition === this.props.index) {
      dot = <button onClick={this.handleClick} className={styles.relatedPurchasesSliderDotActive} data-testid="activeBtn"></button>
    } else {
      dot = <button onClick={this.handleClick} className={styles.relatedPurchasesSliderDot}></button>
    }

    return (
      <span>{dot}</span>
    );
  }
}

export default SliderDot;