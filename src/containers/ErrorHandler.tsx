import React, { Component, ReactNode } from "react";

type Props = {
  children: JSX.Element;
  onError?: (error: Error, componentStack: string) => void;
};

type ErrorInfo = {
  componentStack: string;
};

type State = {
  error: Error | null;
};

export default class ErrorHandler extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === "function") {
      try {
        onError.call(this, error, info?.componentStack);
      } catch {
        // ignore
      }
    }

    this.setState({ error });
  }

  render(): ReactNode {
    const { children } = this.props;
    const { error } = this.state;

    if (error === null) {
      return children;
    }

    const message = error.toString();

    return <div>500 error! {message}</div>;
  }
}
