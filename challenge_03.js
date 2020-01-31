importScripts('lib/tank.js');

// Don't know where to start?
// Read Getting Started in "Docs" section 

tank.init(function(settings, info) {
	// initialize tank here
  
});
var degrees = null;


tank.loop(function(state, control) {
	// write your tank logic here
  console.log(state.radar.enemy);

  
  if(state.radar.enemy == null) {
	  control.RADAR_TURN = 1
  } else {
		control.RADAR_TURN = 0

    degrees = state.radar.enemy.angle;
    
    // console.log("enemy", degrees, "gun", state.gun.angle);
    control.TURN = getRotationSpeed(state.angle, degrees);
    control.SHOOT = getShootSpeed(state.angle, degrees) ;
  }
  
});

function getRotationSpeed(currentAngle, targetAngle) {
  let roundedCurrent = (round(currentAngle, 1));
  let roundedTarget = (round(targetAngle, 1));

  //console.log("roundedCurrent", roundedCurrent, "roundedTarget", roundedTarget, "diff", roundedCurrent - roundedTarget);

  result = Math.sin(toRadians(roundedCurrent - roundedTarget));  
  
  return result;
}

function getShootSpeed(currentAngle, targetAngle) {
	return 1 - Math.pow(Math.abs(getRotationSpeed(currentAngle, targetAngle)), 0.75);
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


function isInAngle(currentAngle, targetAngle) {
  let roundedCurrent = Math.round(currentAngle)
  let roundedTarget = Math.round(targetAngle);
  roundedCurrent = normalizeAngle(roundedCurrent);
	roundedTarget = normalizeAngle(roundedTarget);

  console.log( roundedCurrent, roundedTarget, ( roundedTarget + 180 )% 360);

  return roundedCurrent == ( roundedTarget  )% 360 ;
}
