export async function getPriceFromAddress(address: string) {
  const req = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd`)
  const response = await req.json()

  return response[address.toLowerCase()].usd
}
