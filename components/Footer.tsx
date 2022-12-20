import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div>Data updates continuously, using 7 day average</div>
      <div>
        Powered by <a href="https://cryptostats.community">CryptoStats</a>
      </div>

      <div>
        <a href="https://forum.cryptostats.community">Request Project</a>
        {' | '}
        <a href="https://t.me/+VNTjwOvI-W40Y2E5">Join our Telegram</a>
        {' | '}
        <a href="https://github.com/dmihal/moneyprinter.info">GitHub</a>
      </div>

      <div>
        <b>cryptofees.info</b>
        {' | '}
        <a href="https://cryptofees.info">cryptofees.info</a>
        {' | '}
        <a href="https://ethburned.info">ethburned.info</a>
        {' | '}
        <a href="https://l2fees.info">l2fees.info</a>
        {' | '}
        <a href="https://moneymovers.info">moneymovers.info</a>
        {' | '}
        <a href="https://open-orgs.info">open-orgs.info</a>
      </div>

      <style jsx>{`
        footer {
          text-align: center;
          padding-top: 2rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
