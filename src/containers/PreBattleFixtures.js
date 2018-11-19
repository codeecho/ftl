import { connect } from 'react-redux';

import * as actions from '../actions';

import PreBattleFixtures from '../components/PreBattleFixtures';

const mapStateToProps = (state, ownProps) => {
    
  const {gameState, teams} = state;
  
  const roundNo = state.gameState.round;
  
  const fixtures = state.fixtures[roundNo];
  
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

const PreBattleFixturesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreBattleFixtures);

export default PreBattleFixturesContainer;