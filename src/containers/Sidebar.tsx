import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt, faTable, faTimes, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Color } from "@themesberg/react-bootstrap/lib/esm/types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import SimpleBar from "simplebar-react";

import ReactHero from "src/assets/images/logo.svg";
import ProfilePicture from "src/assets/images/team/profile-picture-3.jpg";
import SIDEBAR_MENU, { ROUTE_CONFIG } from "src/constants/menu";

interface CollapsableNavItemProps {
  eventKey: string;
  title: string;
  icon: IconProp;
  children?: JSX.Element | JSX.Element[];
}

interface NavItemProps {
  link: string;
  title: string;
  icon?: IconProp;
  image?: string;
  external?: boolean;
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: Color;
  target?: string;
}

export default (): JSX.Element => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = (): void => setShow(!show);

  const CollapsableNavItem = (props: CollapsableNavItemProps): JSX.Element => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props: NavItemProps): JSX.Element => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    let linkProps = {};
    if (external) {
      linkProps = { href: link };
    } else if (link) {
      linkProps = { as: Link, to: link };
    }

    return (
      <Nav.Item className={navItemClassName} onClick={(): void => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand className="me-lg-5" as={Link} to={ROUTE_CONFIG.DASHBOARD.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="sm"
                    to={ROUTE_CONFIG.LOGIN.path}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="TheMoneyApp"
                external={true}
                link="https://themoneyapp.org"
                target="_blank"
                image={ReactHero}
              />

              {SIDEBAR_MENU.map((item, index: number): JSX.Element => {
                if (item.route) {
                  return (
                    <NavItem
                      key={index}
                      title={item.title}
                      link={item.route.path}
                      icon={faChartPie}
                    />
                  );
                }
                return (
                  <CollapsableNavItem
                    key={index}
                    eventKey={`${item.eventKey}/`}
                    title={item.title}
                    icon={faTable}
                  >
                    {item.submenu.map(
                      (sub): JSX.Element => (
                        <NavItem title={sub.title} link={sub.route ? sub.route.path : "/"} />
                      )
                    )}
                  </CollapsableNavItem>
                );
              })}

              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
