// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface _priceFeed)
        public
        view
        returns (uint)
    {
        (, int price, , , ) = _priceFeed.latestRoundData();
        return uint(price);
    }

    function getConversionRate(uint ethAmount, AggregatorV3Interface _priceFeed)
        internal
        view
        returns (uint)
    {
        uint perEthPrice = getPrice(_priceFeed);
        uint PriceAfterConverting = (perEthPrice * ethAmount) /
            1000000000000000000;
        return PriceAfterConverting;
    }
}
