import { useContext } from 'react'

import { TierListContext } from 'providers/TierListProvider'

const useTierList = () => useContext(TierListContext)

export default useTierList
