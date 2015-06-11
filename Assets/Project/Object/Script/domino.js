#pragma strict

var isAlreadyForced = false;

var obj : GameObject; // GameObject型
var system : gameSystem; //ScriptB型(スクリプト名が型名になる)

function Start () {
	obj = GameObject.Find("System");//シーン上にある ObjectB という名前のオブジェクトをobjにいれる
	system = obj.GetComponent("gameSystem");//objectBについてるScriptBをscriptに入れる
	//Debug.Log(script.isStarted);
}

function Update () {

}

function OnCollisionEnter(collision:Collision){
	//Debug.Log("衝突オブジェクト"+collision.gameObject.tag);
	if(system.isStarted&&collision.gameObject.tag=="Object"){
		//まだ力を与えていなければ正面方向に力を加える
		Debug.Log("オブジェクトが衝突");
		addForce(transform.forward);
		isAlreadyForced = true;
	}

}

function addForce(direction){
	var gravity: Vector3 = new Vector3(100*transform.forward.x,100*transform.forward.y,100*transform.forward.z);
	Debug.Log(gravity);
	this.GetComponent.<Rigidbody>().angularVelocity = gravity;

}