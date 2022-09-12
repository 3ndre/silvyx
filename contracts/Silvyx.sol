// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Silvyx {

    address public owner;

    struct WithdrawPosition { //amount of ether staked by specificed address for specific time

        uint withdrawId;
        address walletAddress;
        uint createdDate;
        uint withdrawAmount;
        bool withdrawOpen;
    }

    WithdrawPosition position;

    uint public currentWithdrawId;
    mapping(uint => WithdrawPosition) public positions; //has all the listed postion to be queried with id
    mapping(address => uint[]) public withdrawIdsByAddress;
   

    constructor() payable { 
        owner = msg.sender;
        currentWithdrawId = 0;
    }


//Amount to withdraw from wallet

    function withdrawAmount() external payable {
       
        require(msg.value > 0, "Withdrawal amount must be greater than zero");

        positions[currentWithdrawId] = WithdrawPosition(
            currentWithdrawId,
            msg.sender,
            block.timestamp,
            msg.value,
            true
        );

        withdrawIdsByAddress[msg.sender].push(currentWithdrawId);
        currentWithdrawId +=1;
    }


//Get withdraw position by id
    function getPositionById(uint withdrawId) external view returns(WithdrawPosition memory) {
        return positions[withdrawId];
    }

//Get withdraw position by wallet
    function getPositionIdsForAddress(address walletAddress) external view returns(uint[] memory) {
        return withdrawIdsByAddress[walletAddress];
    }



//Confirm recieved to release token

    function confirmRecieved(uint withdrawId, address reciever) external {
        require(positions[withdrawId].walletAddress == msg.sender, "Only withdrawwal position creator may modify positions");
        require(positions[withdrawId].withdrawOpen == true, "Withdrawawl is closed");

        positions[withdrawId].withdrawOpen = false;

        payable(reciever).call{value: positions[withdrawId].withdrawAmount}("");

    }

//Abort the withdrawal of token

    function abortWithdraw(uint withdrawId) external {
            require(positions[withdrawId].walletAddress == msg.sender, "Only withdrawal position creator may modify positions");
            require(positions[withdrawId].withdrawOpen == true, "Withdrawal is closed");

            positions[withdrawId].withdrawOpen = false;

            payable(msg.sender).call{value: positions[withdrawId].withdrawAmount}("");

        }




}
