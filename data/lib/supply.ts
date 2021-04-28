import { Contract, Provider } from 'ethers-multicall'
import { ethers } from 'ethers'
import { date2block } from 'date2block'

import erc20Abi from '../abi/IERC20.json'

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC!)

const ONE_DAY = 24 * 60 * 60 * 1000

const today = new Date()
today.setUTCHours(0)
today.setUTCMinutes(0)
today.setUTCSeconds(0)

const yesterday = new Date(today - ONE_DAY)
const weekAgo = new Date(today - (ONE_DAY * 7))

const todayBlock = date2block(today)
const yesterdayBlock = date2block(yesterday)
const weekAgoBlock = date2block(weekAgo)

export async function getSupply(address: string) {
  // const ethcallProvider = new Provider(provider)

  // await ethcallProvider.init()

  const contract = new ethers.Contract(address, erc20Abi, provider)

  const todaySupply = await contract.totalSupply({ blockTag: todayBlock })
  const yesterdaySupply = await contract.totalSupply({ blockTag: yesterdayBlock })
  const weekAgoSupply = await contract.totalSupply({ blockTag: weekAgoBlock })

  return { todaySupply, yesterdaySupply, weekAgoSupply }
}

export async function getBalance(token: string, holder: string) {
  const contract = new ethers.Contract(address, erc20Abi, provider)

  const todaySupply = await contract.totalSupply({ blockTag: todayBlock })
  const yesterdaySupply = await contract.totalSupply({ blockTag: yesterdayBlock })
  const weekAgoSupply = await contract.totalSupply({ blockTag: weekAgoBlock })

  return { todaySupply, yesterdaySupply, weekAgoSupply }
}
