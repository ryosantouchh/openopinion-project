// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { Review } from './Review.sol';

contract Collection is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    mapping(address => uint256) OwnToken;

    Review burner;

    constructor()
        ERC721("MyToken", "MTK")
        Ownable(msg.sender)
    {}

    function burn() external onlyBurner {
        _burn(OwnToken[msg.sender]);
    }

    function setBurner(address _burner) public onlyOwner {
        burner = Review(_burner);
    }

    modifier onlyBurner() {
        require(msg.sender == address(burner), "Burner is not authorized");
        _;
    }

    function safeMint() public {
        require(balanceOf(msg.sender) < 1, "One NFT per person");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        OwnToken[msg.sender] = tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        require(to == address(0), "Only null");
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}