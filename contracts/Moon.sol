// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Moon is ERC20 {
    constructor() ERC20("Moon", "MOON") {
        _mint(msg.sender, 1000000000);
    }
}
