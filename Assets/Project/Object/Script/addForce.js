#pragma strict

function Start () {
	
}

function Update () {

}


function addForce(){

	var a : Vector3 = Vector3(10, 0, 0);

	// 物体に回転加速度を与える。この例ではx軸方向への回転を行う。（rotationが変わる）
	this.GetComponent.<Rigidbody>().angularVelocity = a;

}