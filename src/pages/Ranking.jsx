import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Ranking.css';

class Ranking extends Component {
  render() {
    const getStorageRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-card">
        <h1 data-testid="ranking-title">Ranking</h1>
        { getStorageRanking
          .sort((a, b) => b.player.score - a.player.score)
          .map((player, index) => (
            <div className="ranking-pont" key={ index }>
              <h2 data-testid={ `player-name-${index}` }>{ player.player.name}</h2>
              <h2 data-testid={ `player-score-${index}` }>{ player.player.score}</h2>
            </div>
          ))}
        <Link to="/">
          <button
            data-testid="btn-go-home"
            className="button-play-again"
            type="button"
          >
            Jogar novamente

          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
