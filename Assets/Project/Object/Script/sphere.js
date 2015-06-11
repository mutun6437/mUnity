#pragma strict

var isAlreadyForced = false;

var obj : GameObject; // GameObject型
var system : gameSystem; //ScriptB型(スクリプト名が型名になる)

function Start () {
	obj = GameObject.Find("System");//シーン上にある ObjectB という名前のオブジェクトをobjにいれる
	system = obj.GetComponent("gameSystem");//objectBについてるScriptBをscriptに入れる
	//Debug.Log(script.isStarted);
}

function OnCollisionEnter(collision:Collision){
	//Debug.Log("衝突オブジェクト"+collision.gameObject.tag);
	if(system.isStarted&&collision.gameObject.tag=="Object"){
		//まだ力を与えていなければ正面方向に力を加える
		Debug.Log("オブジェクトが衝突");
		var contact = collision.contacts[0];
		Debug.Log(contact.point.x);
		addForce(-collision.gameObject.transform.position + contact.point);
		isAlreadyForced = true;
	}

}

function addForce(direction:Vector3){
	var gravity: Vector3 = new Vector3(100*direction.x,0,100*direction.z);
	Debug.Log(gravity);
	this.GetComponent.<Rigidbody>().AddForce(gravity);
}