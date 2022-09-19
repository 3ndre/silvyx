// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract Silvyx {

    address public owner;

    struct WithdrawPosition { //amount of ether to be withdraw and their information

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
    uint[] public withdrawIds;

//------------------------Staking Position ----------------------------------------------------

    struct StakingPosition { //amount of ether staked by teller for specific time

        uint positionId;
        address walletAddress;
        uint createdDate;
        uint unlockDate;
        uint percentInterest;
        uint weiStaked;
        uint weiInterest;
        bool open;
    }

    StakingPosition stakingposition;
    uint public currentPositionId;
    mapping(uint => StakingPosition) public stakingpositions; //has all the listed postion to be queried with id
    mapping(address => uint[]) public positionIdsByAddress;
    mapping(uint => uint) public tiers;
    uint[] public lockPeriods;

//-------------------------------------------------------------------------------


    constructor() payable { 
        owner = msg.sender;
        currentWithdrawId = 0;

//-------Staking position----------------------
        currentPositionId = 0;
        tiers[4] = 100; //1% apy
        tiers[7] = 200; //2% apy
        tiers[10] = 300; //3% apy

        lockPeriods.push(4);
        lockPeriods.push(7);
        lockPeriods.push(10);
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
        withdrawIds.push(currentWithdrawId);
        currentWithdrawId +=1;
    }


//Get withdraw position by id
    function getWithdrawPositionById(uint withdrawId) external view returns(WithdrawPosition memory) {
        return positions[withdrawId];
    }


//Get all withdraw position Id
    function getWithdrawPositionIds() external view returns(uint[] memory) {
        return withdrawIds;
    }

//Get withdraw position by wallet
    function getWithdrawPositionIdsForAddress(address walletAddress) external view returns(uint[] memory) {
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


//-------Staking postition--------------------------------


//Stake token for teller
function stakeToken(uint numDays) external payable {
        require(tiers[numDays] > 0, "Days not available");

        stakingpositions[currentPositionId] = StakingPosition(
            currentPositionId,
            msg.sender,
            block.timestamp,
            block.timestamp + (numDays * 1 days),
            tiers[numDays],
            msg.value,
            calculateInterest(tiers[numDays], numDays, msg.value),
            true
        );

        positionIdsByAddress[msg.sender].push(currentPositionId);
        currentPositionId +=1;
    }

//Calculate interest 
    function calculateInterest(uint basisPoints, uint numDays, uint weiAmount) private pure returns(uint) {
        return basisPoints * weiAmount / 10000;
    }

//Modify staking periods for owners
    function modifyLockPeriods(uint numDays, uint basisPoints) external {
        require(owner == msg.sender, "Only owner have access to staking periods");

        tiers[numDays] = basisPoints;
        lockPeriods.push(numDays);
    }

//Get all staking periods
    function getLockPeriods() external view returns(uint[] memory) {
        return lockPeriods;
    }

//Get interest rates
    function getInterestRate(uint numDays) external view returns(uint) {
        return tiers[numDays];
    }

//Get staking position by Id
    function getPositionById(uint positionId) external view returns(StakingPosition memory) {
        return stakingpositions[positionId];
    }

//Get staking position by wallet address
    function getPositionIdsForAddress(address walletAddress) external view returns(uint[] memory) {
        return positionIdsByAddress[walletAddress];
    }

//Modify staking date for owners
    function changeUnlockDate(uint positionId, uint newUnlockDate) external {
        require(owner == msg.sender, "Only owner may modify unlock dates");

        stakingpositions[positionId].unlockDate = newUnlockDate;
    }

//Close staking for tellers
    function closePosition(uint positionId) external {
        require(stakingpositions[positionId].walletAddress == msg.sender, "Only staking position creator may modify positions");
        require(stakingpositions[positionId].open == true, "Staking position is closed");

        stakingpositions[positionId].open = false;

        if(block.timestamp > stakingpositions[positionId].unlockDate) {
            uint amount = stakingpositions[positionId].weiStaked + stakingpositions[positionId].weiInterest;
            payable(msg.sender).call{value: amount}("");
        } else {
            payable(msg.sender).call{value: stakingpositions[positionId].weiStaked}("");
        }


    }



}
