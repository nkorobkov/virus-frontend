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
        </div>
      </footer>
    );
  }
}

export default Footer;
