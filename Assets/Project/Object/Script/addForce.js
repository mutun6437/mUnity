#pragma strict

var obj : GameObject; // GameObject型
var system : gameSystem; //ScriptB型(スクリプト名が型名になる)

function Start () {
	obj = GameObject.Find("System");//シーン上にある ObjectB という名前のオブジェクトをobjにいれる
	system = obj.GetComponent("gameSystem");//objectBについてるScriptBをscriptに入れる
	//Debug.Log(script.isStarted);
}

function Update () {
	
}


function addForce(){

	if(!system.isStarted){
		system.isStarted = true;

		var a : Vector3 = Vector3(0, 0, 10);
		// 物体に回転加速度を与える。この例ではx軸方向への回転を行う。（rotationが変わる）
		this.GetComponent.<Rigidbody>().angularVelocity = a;



	}
}



