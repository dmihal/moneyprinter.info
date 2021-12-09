import React from 'react';
import Attribute from './Attribute';

const DetailsCard: React.FC<{ metadata: any }> = ({ metadata }) => {
  return (
    <div className="details-card">
      <div className="metadata">
        {metadata.description && <div className="description">{metadata.description}</div>}
        {metadata.issuanceDescription && (
          <Attribute title="Issuance Model">{metadata.issuanceDescription}</Attribute>
        )}

        <div className="row">
          {metadata.website && (
            <Attribute title="Website">
              <a href={metadata.website} target="website">
                {metadata.website.replace('https://', '')}
              </a>
            </Attribute>
          )}
          {metadata.blockchain && <Attribute title="Blockchain">{metadata.blockchain}</Attribute>}
        </div>

        {metadata.tokenTicker && (
          <div className="row">
            <Attribute title="Token">
              <a
                href={`https://www.coingecko.com/en/coins/${metadata.tokenCoingecko}`}
                target="coingecko"
              >
                {metadata.tokenTicker}
              </a>
            </Attribute>

            <Attribute title="Price">
              {metadata.price?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Attribute>
            <Attribute title="Market Cap">
              {metadata.marketCap?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Attribute>
            <Attribute title="P/S Ratio" tooltip="Based on 7 day average fees, annualized">
              {metadata.psRatio?.toFixed(2)}
            </Attribute>
          </div>
        )}

        <div className="spacer" />
      </div>

      <style jsx>{`
        .details-card {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .metadata {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .description {
          margin: 4px 0;
        }
        .row {
          display: flex;
        }
        .row > :global(div) {
          flex: 1;
        }
        .spacer {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default DetailsCard;
