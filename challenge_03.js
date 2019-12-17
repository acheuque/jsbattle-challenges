importScripts('lib/tank.js');

// Don't know where to start?
// Read Getting Started in "Docs" section 

tank.init(function(settings, info) {
	// initialize tank here
  
});

tank.loop(function(state, control) {
	// write your tank logic here
  if(state.radar.enemy == null) {
	  control.RADAR_TURN = 1
  } else {
  	control.RADAR_TURN = 0
    const delta = 10;
    const degrees = state.radar.enemy.angle;
    control.GUN_TURN = getRotationSpeed(state.gun.angle, degrees);
    control.SHOOT = getShootSpeed(state.gun.angle, degrees) ;
    /*
    if( isInAngle(state.gun.angle, degrees) ) {
      control.GUN_TURN = 0;
      control.SHOOT = 1;
    } else {
      control.GUN_TURN = 0.5 ;
    }
    */
  }
  
});

function isInAngle(currentAngle, targetAngle) {
  let roundedCurrent = Math.round(currentAngle)
  let roundedTarget = Math.round(targetAngle);
  roundedCurrent = normalizeAngle(roundedCurrent);
	roundedTarget = normalizeAngle(roundedTarget);

  console.log( roundedCurrent, roundedTarget, ( roundedTarget + 180 )% 360);

  return roundedCurrent == ( roundedTarget + 180 )% 360 ;
}

function getRotationSpeed(currentAngle, targetAngle) {
  let roundedCurrent = round(currentAngle, 1)
  let roundedTarget = round(targetAngle, 1);
  result = Math.sin(toRadians(roundedCurrent - roundedTarget));  
  return result;
}

function getShootSpeed(currentAngle, targetAngle) {
	return 1 - Math.pow(Math.abs(getRotationSpeed(currentAngle, targetAngle)), 0.25);
}

function normalizeAngle(angle) {
	return angle < 0 ? 360 + angle:  angle;
}

function round(number, decimals) {
	if(!decimals) return Math.round(number);
  const factor = Math.pow(10, decimals) ;
  return Math.round(number * factor)/factor; 
}

function  toRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
