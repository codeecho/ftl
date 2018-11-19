import { connect } from 'react-redux';

import * as actions from '../actions';

import PostBattleResults from '../components/PostBattleResults';

const mapStateToProps = (state, ownProps) => {
    
  const {gameState, teams} = state;
  
  const roundNo = state.gameState.round;
  
  const fixtures = state.fixtures[roundNo-1];
  
  const decoratedFixtures = fixtures.map(fixture => {
    const {homeId, awayId} = fixture;
    const homeTeam = state.teams.find(team => team.id === homeId);
    const awayTeam = state.teams.find(team => team.id === awayId);    
    return Object.assign({}, fixture, {homeTeam, awayTeam});
  });
  
  return {
      fixtures: decoratedFixtures
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    advance: () => dispatch(actions.advance())
  };
};

const PostBattleResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostBattleResults);

export default PostBattleResultsContainer;