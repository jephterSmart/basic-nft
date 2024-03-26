// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nft is ERC721("Doggie", "DOG") {
    string public constant TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    uint256 private s_tokenCounter;

    constructor() {
        s_tokenCounter = 0;
    }

    function mintNft() public returns (uint256) {
        s_tokenCounter += 1;
        _safeMint(msg.sender, s_tokenCounter);

        return s_tokenCounter;
    }

    function tokenURI(
        uint256 /*tokenId*/
    ) public pure override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}