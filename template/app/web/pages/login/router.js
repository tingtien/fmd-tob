import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import '@fmd/component-pro-view/lib/exception/style/css';
import { Exception } from '@fmd/component-pro-view';
import '@common/css/global.scss';

class ModalSwitch extends Component {
  constructor(props) {
    super(props);
    this.previousLocation = this.props.location;
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = nextProps.history.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          {
            routes.map((item, key) => {
              return (
                <Route exact path={item.path} key={key} component={item.component} />
              );
            })
          }
          <Route component={Exception} />
        </Switch>
      </div>
    );
  }
}

export default () => (
  <Router basename={MI.config.reactRoute}>
    <Route component={ModalSwitch} />
  </Router>
);
