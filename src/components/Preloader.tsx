import { Image } from "@themesberg/react-bootstrap";

import ReactLogo from "src/assets/images/react-logo-transparent.svg";

export default ({ show }: { show: boolean }): JSX.Element => {
  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={ReactLogo}
        height={40}
      />
    </div>
  );
};
