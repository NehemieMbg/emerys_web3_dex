//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ERC20 {
    /**
     * name: Returns the name of the token
     * symbol: Returns the symbole of the token
     * decimals: Returns the number of decimals the token uses
     * totalSupply: Returns the total token supply
     */
    string public name; // Token name
    string public symbol; // Token symbol (identifier)
    uint256 public decimals = 18; // How many decimals to show
    uint256 public totalSupply; // Token total supply

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    // Events

    /**
     * @dev Store the Transfer transaction logs.
     * @param _from The address where tokens were sent from.
     * @param _to The address where tokens were sent.
     * @param _value The amount of token to sent.
     */
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * @dev Store the Approval transaction logs.
     * @param _owner The address which hold the funds.
     * @param _spender The address that spent the funds.
     * @param _value The amount of token spent.
     */
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    /**
     * @dev
     * @param _name Set the name of the token
     * @param _symbol Set the symbol (identifier)
     * @param _totalSupply Update the total supply
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10 ** decimals);
        // Gives the creator inital tokens
        balances[msg.sender] = totalSupply;
    }

    // MODIFIERS

    /**
     * @dev restriction to which address is unable to receive a transaction.
     * @param _to the address which cannor receive transaction.
     */
    modifier existingAddress(address _to) {
        require(_to != address(0), "non existing address");
        _;
    }

    // HELPER FUNCTIONS

    /**
     * @dev Helper Function to transfer tokens from one address to another.
     * @param _from is the address where tokens will be debited.
     * @param _to is the receiver.
     * @param _value is the amount.
     */
    function _transfer(address _from, address _to, uint256 _value) private {
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
    }

    // METHODS

    /**
     * @dev Transfer tokens to a specific address.
     * @param _to the address to transfer to.
     * @param _value the amount to be transfered.
     */
    function transfer(
        address _to,
        uint256 _value
    ) public existingAddress(_to) returns (bool success) {
        require(balances[msg.sender] >= _value, "not enough balance");

        _transfer(msg.sender, _to, _value);
        return true;
    }

    /**
     * @dev Transfer token from an address to another
     * @param _from address to send token from
     * @param _to  address to transfer to
     * @param _value the amount to be transfered
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public existingAddress(_to) returns (bool success) {
        require(
            balances[_from] >= _value && allowed[_from][msg.sender] >= _value
        );

        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * @dev Gets the balance of a specific address
     * @param _owner The address to get the balance from
     * @return balance an uint256 representing the amount that the address hold
     */
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    /**
     * @dev Check the amount of tokens that an onwer allowed to a spender.
     * @param _owner The address which owns the funds.
     * @param _spender The address that will spend the funds.
     * @return remaining An uint256 specifying the amount of tokens remaining.
     */
    function allowance(
        address _owner,
        address _spender
    ) public view existingAddress(_owner) returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
