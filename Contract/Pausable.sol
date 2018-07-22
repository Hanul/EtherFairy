pragma solidity ^0.4.24;

import "./Ownable.sol";

// 소유자가 애플리케이션을 중단할 수 있도록
contract Pausable is Ownable {
	
	event Pause();
	event Resume();
	
	bool public paused = false;
	
	modifier whenRunning() {
		require(paused != true);
		_;
	}
	
	modifier whenPaused() {
		require(paused == true);
		_;
	}
	
	// 애플리케이션의 작동을 중지합니다.
	function pause() onlyOwner whenRunning public {
		paused = true;
		emit Pause();
	}
	
	// 애플리케이션을 다시 동작시킵니다.
	function resume() onlyOwner whenPaused public {
		paused = false;
		emit Resume();
	}
}