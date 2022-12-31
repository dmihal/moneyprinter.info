import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div>Data is refreshed every 6 hours</div>
      <div>
        Sponsored by <a href="https://chainflow.io">Chainflow</a>
      </div>

      <div>
        Built with &hearts; by{" "}
        <a href="https://twitter.com/xenowits">xenowits</a>
        {/* {" | "}
        <a href="https://t.me/+VNTjwOvI-W40Y2E5">Join our Telegram</a> */}
        {" | "}
        <a href="https://github.com/xenowits/nakomoto-coefficient-calculator">
          GitHub
        </a>
      </div>

      <div>
        <b>
          Adapted from{" "}
          <a href="https://github.com/dmihal/moneyprinter.info">moneyprinter.info</a>{" "}
          with permission
        </b>
        {/* {" | "}
        <a href="https://cryptofees.info">cryptofees.info</a>
        {" | "}
        <a href="https://ethburned.info">ethburned.info</a>
        {" | "}
        <a href="https://l2fees.info">l2fees.info</a>
        {" | "}
        <a href="https://moneymovers.info">moneymovers.info</a>
        {" | "}
        <a href="https://open-orgs.info">open-orgs.info</a> */}
      </div>

      <style jsx>{`
        footer {
          text-align: center;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
