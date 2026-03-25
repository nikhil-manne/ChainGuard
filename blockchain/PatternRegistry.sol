// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatternRegistry {
    struct Pattern {
        bytes32 hash;
        address reporter;
        uint timestamp;
    }
    Pattern[] public patterns;
    event PatternAdded(bytes32 hash, address reporter);
    function addPattern(bytes32 _hash) public {
        patterns.push(Pattern(_hash, msg.sender, block.timestamp));
        emit PatternAdded(_hash, msg.sender);
    }
}