// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Yoshi is ERC20 {
    constructor() ERC20("Yoshi", "YSHI") {
        _mint(msg.sender, 1000000000);
    }
}
