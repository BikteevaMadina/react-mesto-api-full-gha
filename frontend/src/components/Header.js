import React from "react";
import {Link, Route} from "react-router-dom";

function Header({onSignOut, signUp, signIn, signOut, headerEmail }) {
  return (
    <header className="header">
      <div className="header__logo"></div>

      <Route path="/sign-in">
                <Link
                    className="header__link"
                    to="sign-up">
                    {signUp}
                </Link>
            </Route>

            <Route path="/sign-up">
                <Link
                    className="header__link"
                    to="sign-in">
                    {signIn}
                </Link>
            </Route>

            <Route exact path="/">
                <div className="header__container">
                    <p className="header__email">
                        {headerEmail}
                    </p>
                    <Link
                        className="header__exit"
                        onClick={onSignOut}
                        to="sign-in">
                        {signOut}
                    </Link>
                </div>
            </Route>
    </header>
  );
}

export default Header;
