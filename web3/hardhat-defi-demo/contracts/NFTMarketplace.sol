// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {

    // using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    // Counters.Counter private _tokenIds;
    uint256 private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    // Counters.Counter private _itemsSold;
    uint256 private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listPrice = 0.01 ether;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    // 添加一个事件来记录状态变化
    event ListedStatusUpdated(uint256 indexed tokenId, bool currentlyListed, uint256 price);

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("NFTMarketplace", "NFTM") {
        owner = payable(msg.sender);
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        // uint256 currentTokenId = _tokenIds.current();
        // return idToListedToken[currentTokenId];
        return idToListedToken[_tokenIds];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        // return _tokenIds.current();
        return _tokenIds;
    }

    //The first time a token is created, it is listed here
    function createToken(string calldata tokenURI, uint256 price) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        // _tokenIds.increment();
        _tokenIds += 1;
        // uint256 newTokenId = _tokenIds.current();
        uint256 newTokenId = _tokenIds;

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        createListedToken(newTokenId, price);

        return newTokenId;
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = ListedToken(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }
    
    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        // uint nftCount = _tokenIds.current();
        uint itemCount = 0;
        for(uint i=0; i < _tokenIds; i++)
        {
            if(idToListedToken[i+1].currentlyListed == true){
                itemCount += 1;
            }
        }

        ListedToken[] memory tokens = new ListedToken[](itemCount);
        uint nftCount = _tokenIds;
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedToken memory currentItem = idToListedToken[currentId];
            // 判断是否在售状态
            if (currentItem.currentlyListed == true) {
                tokens[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }
    
    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        // uint totalItemCount = _tokenIds.current();
        uint totalItemCount = _tokenIds;
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].seller == msg.sender) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        //update the details of the token
        // 销售完后, 更新在售状态
        idToListedToken[tokenId].currentlyListed = false;
        idToListedToken[tokenId].seller = payable(msg.sender);
        // _itemsSold.increment();
        _itemsSold += 1;

        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(seller).transfer(msg.value);
    }

    function updateListedStatus(uint256 tokenId, bool currentlyListed, uint256 price) public payable {
        ListedToken storage token = idToListedToken[tokenId];
        require(token.tokenId != 0, "Token does not exist");
        require(msg.sender == token.seller, "Only seller can change NFT list status");
        require(token.currentlyListed != currentlyListed, "Listed status is already set to the given value");
        
        if (currentlyListed) {
            require(msg.value == listPrice, "Must pay the listing fee");
            _transfer(msg.sender, address(this), tokenId);
            token.price = price;
        } else {
            require(address(this).balance >= listPrice, "Contract doesn't have enough balance to refund");
            payable(msg.sender).transfer(listPrice);
            _transfer(address(this), msg.sender, tokenId);
        }
        
        token.currentlyListed = currentlyListed;
        
        emit ListedStatusUpdated(tokenId, currentlyListed, price);
    }

    //We might add a resell token function in the future
    //In that case, tokens won't be listed by default but users can send a request to actually list a token
    //Currently NFTs are listed by default
}
