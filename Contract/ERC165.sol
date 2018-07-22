pragma solidity ^0.4.24;

interface ERC165 {
	function supportsInterface(bytes4 interfaceId) view external returns (bool);
}