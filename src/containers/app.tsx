import React from "react";
import { connect } from "react-redux";

import { appLoadInit } from "src/actions/app";
import logo from "src/assets/images/logo.svg";
import { BaseProps } from "src/types/props";
import { StoreState } from "src/types/state";
import { StatusEnum } from "src/types/common";

import "src/styles/app.scss";


interface PropsFromStore {
  status: StatusEnum;
}

interface Props extends BaseProps, PropsFromStore { }


export class App extends React.Component<Props> {
  componentDidMount(): void {
    this.props.dispatch(appLoadInit());
  }

  render(): JSX.Element {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


function mapStateToProps(state: StoreState): PropsFromStore {
  return {
    status: state.app.status,
  };
}


export default connect(mapStateToProps)(App);
