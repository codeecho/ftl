import { connect } from 'react-redux';

import * as actions from '../actions';

import BattleTest from '../components/BattleTest';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  };
};

const BattleTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleTest);

export default BattleTestContainer;