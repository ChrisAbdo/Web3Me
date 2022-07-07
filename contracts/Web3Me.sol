// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3Me {
    string public name;
    uint256 public fileCount = 0;
    mapping(uint256 => File) public files;

    struct File {
        uint256 id;
        string hash;
        string description;
        address payable author;
    }

    event FileCreated(
        uint256 id,
        string hash,
        string description,
        address payable author
    );

    constructor() {
        name = "Web3Me";
    }

    function uploadFile(string memory _imgHash, string memory _description)
        public
    {
        // Make sure the image hash exists
        require(bytes(_imgHash).length > 0);
        // Make sure image description exists
        require(bytes(_description).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment image id
        fileCount++;

        // Add Image to the contract
        files[fileCount] = File(
            fileCount,
            _imgHash,
            _description,
            payable(msg.sender)
        );
        // Trigger an event
        emit FileCreated(
            fileCount,
            _imgHash,
            _description,
            payable(msg.sender)
        );
    }
}
