pragma solidity ^0.4.24;

import "./ERC165.sol";

// 대체불가 토큰 작성을 위한 ERC-721 표준
contract ERC721 is ERC165 {
    
    // 토큰이 전송될 때 발생하는 이벤트
    event Transfer(address from, address to, uint256 tokenId);
    
    // 사용자가 거래소 등에 토큰 이동 권한을 위임할 때 발생하는 이벤트
    event Approval(address owner, address approved, uint256 tokenId);
    
	function totalSupply() view public returns (uint256 total);
	
	function balanceOf(address owner) view public returns (uint256 balance);
	
	function ownerOf(uint256 tokenId) view external returns (address owner);
	
	function approve(address to, uint256 tokenId) external;
	
	function transfer(address to, uint256 tokenId) external;
	
	function transferFrom(address from, address to, uint256 tokenId) external;
}