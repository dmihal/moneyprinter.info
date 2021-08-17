import sdk from '../sdk'

import { setup as setupAave } from './aave'
import { setup as setupCoinMetrics } from './coinmetrics'
import { setup as setupCompound } from './compound'
import { setup as setupMintableTokens } from './mintable-tokens'

const feesList = sdk.getList('issuance')

feesList.addAdaptersWithSetupFunction(setupAave)
feesList.addAdaptersWithSetupFunction(setupCoinMetrics)
feesList.addAdaptersWithSetupFunction(setupCompound)
feesList.addAdaptersWithSetupFunction(setupMintableTokens)
