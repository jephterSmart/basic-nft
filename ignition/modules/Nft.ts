import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const NftModule = buildModule("NftModule", (m) => {
    const nft = m.contract("Nft", [])

    return { nft }
})

export default NftModule
