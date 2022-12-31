import React from 'react';

const Header = () => {
  return (
    <header>
      {/*<ul className="header-links">*/}
      {/*  <li className="header-link">*/}
      {/*    <div><a href="https://chainflow.io">Chainflow.io</a></div>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      <style jsx>{`
        .header-links {
          display: flex;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .header-link {
          list-style: none;
          position: relative;
        }

        .header-link > a,
        .header-link > div {
          padding: 8px;
          display: block;
          border: solid 1px transparent;
          margin: 0 4px;
          text-align: center;
        }

        .header-link > a:hover {
          border-radius: 3px;
          border: solid 1px #d0d1d9;
          text-decoration: none;
        }

        .dropdown {
          position: absolute;
          background: #f9fafc;
          display: none;
          right: 0;
          padding: 4px;
          border: solid 1px #d0d1d9;
          border-radius: 4px;
        }

        .dropdown .header-link a {
          text-align: right;
        }

        .header-link:hover .dropdown,
        .dropdown:hover {
          display: block;
        }

        .showable {
          display: none;
        }

        @media (max-width: 700px) {
          .header-link > a,
          .header-link > div {
            margin: 0 1px;
            padding: 4px;
          }

          .hideable {
            display: none;
          }

          .showable {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
