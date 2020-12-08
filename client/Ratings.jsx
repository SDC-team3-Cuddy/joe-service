import React from 'react';
import $ from 'jquery';

import { awsUrl } from '../connection.js';

import styles from './css/Ratings.module.css';

class Ratings extends React.Component {
  constructor(props) {
    super(props);

    this.startFilled = `${awsUrl}images/star0.png`;
    this.starEmpty = `${awsUrl}images/star1.png`;

    this.state = {
      ratingCnt: 0,
      stars: []
    }

    // this.getStars = this.getStars.bind(this);
    // this.getRatingCount = this.getRatingCount.bind(this);
    // this.getRatingCount();
  }

  // getRatingCount() {
  //   $.get(`/api/related/getratingcount/${this.props.id}`, (data) => {
  //     this.setState({ratingCnt: Number(data[0].score)});
  //   });
  // }

  componentDidMount() {
    // $.get(`/api/related/getratingavg/${this.props.id}`, (data) => {
      let starRating = Math.round(Number(this.props.average));
      // if (starRating > 5) {
      //   starRating = 5;
      // } else if (starRating < 0) {
      //   starRating = 0;
      // }

      let stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < starRating) {
          stars.push(<img className={styles.star} src={this.startFilled} alt ="filled star"/>);
        } else {
          stars.push(<img className={styles.star} src={this.starEmpty} alt ="empty star"/>);
        }
      }

      this.setState({stars: stars});
    // });
  }

  render() {
    return (
      <div className={styles.ratings}>
        <div className={styles.ratingsAverage} data-testid="starAvg">{this.state.stars}</div>
        <div className={styles.ratingsCount} data-testid="starCnt">({this.props.count})</div>
      </div>
    );
  }
}

export default Ratings;