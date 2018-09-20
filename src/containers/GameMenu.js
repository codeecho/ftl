import { connect } from 'react-redux';
import GameMenu from '../components/GameMenu';

import { advance, setTradeProposal } from '../actions';

const mapStateToProps = (state, ownProps) => {

  const {gameState} = state;
  
  const {teamId} = gameState;

  return {
    teamId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      advance: () => dispatch(advance(1)),
      trade: () => dispatch(setTradeProposal(undefined))
  };
};

const GameMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameMenu);

export default GameMenuContainer;