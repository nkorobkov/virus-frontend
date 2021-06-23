import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer my-footer">
        <div className="content has-text-centered">
          <p>
            Created by <a href="https://nkorobkov.com">Nikita Korobkov</a>. Code
            is licensed under
            <a href="http://opensource.org/licenses/mit-license.php">
              {" "}
              MIT
            </a>{" "}
            license.
          </p>
          <p>
            <a href="https://github.com/nkorobkov/virus-frontend">
              Source Frontend
            </a>{" "}
            ||
            <a href="https://github.com/nkorobkov/virus-game">
              {" "}
              Source Backend
            </a>{" "}
            ||
            <a href="https://nkorobkov.com/projects/virus">
              {" "}
              Project Description
            </a>
          </p>

          {/*<p>*/}
          {/*Share:*/}
          {/*<a href="https://github.com/nkorobkov/virus-frontend">Facebook</a> ||*/}
          {/*<a href="https://github.com/nkorobkov/virus-game"> Twitter</a> ||*/}
          {/*<a href="https://nkorobkov.com/projects/virus"> Mail</a>*/}
          {/*</p>*/}
        </div>
      </footer>
    );
  }
}

export default Footer;
