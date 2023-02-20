// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable {
    struct Token {
        bytes32 symbol;
        address tokenAddress;
    }

    mapping(address => Token) public tokens;
    mapping(address => mapping(address => uint256)) public balances;
    mapping(address => uint) public ethBalance;

    bytes32[] public tokenList;

    event Deposit(
        address token,
        address userAddress,
        uint amount,
        uint userTokenBalance
    );
    event Withdraw(
        address token,
        address userAddress,
        uint amount,
        uint userTokenBalance
    );

    modifier tokenExist(address tokenAddress) {
        require(
            tokens[tokenAddress].tokenAddress != address(0),
            "tokens does not exist"
        );
        _;
    }

    function addToken(bytes32 symbol, address tokenAddress) external onlyOwner {
        tokens[tokenAddress] = Token(symbol, tokenAddress);
        tokenList.push(symbol);
    }

    function deposit(
        uint amount,
        address tokenAddress
    ) external tokenExist(tokenAddress) {
        balances[msg.sender][tokenAddress] += amount;
        IERC20(tokens[tokenAddress].tokenAddress).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        emit Deposit(
            tokenAddress,
            msg.sender,
            amount,
            balances[msg.sender][tokenAddress]
        );
    }

    function withdraw(
        uint amount,
        address tokenAddress
    ) external tokenExist(tokenAddress) {
        require(
            balances[msg.sender][tokenAddress] >= amount,
            "Balance not sufficient"
        );

        balances[msg.sender][tokenAddress] -= amount;
        IERC20(tokens[tokenAddress].tokenAddress).transfer(msg.sender, amount);

        emit Withdraw(
            tokenAddress,
            msg.sender,
            amount,
            balances[msg.sender][tokenAddress]
        );
    }

    function depositEth() external payable {
        ethBalance[msg.sender] += msg.value;
    }
}
