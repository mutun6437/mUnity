#pragma strict

static var targetGameObject : GameObject;
//回転処理用
static var preCreateObject : GameObject;
//作成するオブジェクト
var Prefab:GameObject;

var reticle:GameObject;
var direction:GameObject;

//回転させるかどうか
var isRotate = false;
var _prevX=0;
var _prevY=0;

var obj : GameObject; // GameObject型
var system : gameSystem; //ScriptB型(スクリプト名が型名になる)

function Start () {
	obj = GameObject.Find("System");//シーン上にある ObjectB という名前のオブジェクトをobjにいれる
	system = obj.GetComponent("gameSystem");//objectBについてるScriptBをscriptに入れる
	//Debug.Log(script.isStarted);
}

function Update () {

	//クリックしたときの動作
	if (Input.GetMouseButtonDown(0)) {
		createObject();
		toggleRotate();
	}

	//クリックが終わった時
	if(Input.GetMouseButtonUp(0)){
		toggleRotate();
	}

	//右クリックで削除
	if (Input.GetMouseButtonDown(1)) {
		removeObject();
	}

	//レティクルを表示
	setReticle();  

	//回転イベント
	if(isRotate){
		rotateObject();
	}
		
}



function rotateObject(){
	//回転の処理
	var _deltaX = _prevX - Input.mousePosition.x;
	var _deltaY = _prevY - Input.mousePosition.y;
	_prevX = Input.mousePosition.x;
	_prevY = Input.mousePosition.y;
	var aular:Vector3 = new Vector3(0, _deltaX, 0.0f);
	preCreateObject.transform.Rotate(aular, Space.World);

	//方向の処理
	direction.transform.position = preCreateObject.transform.position;
	direction.transform.position.y = 1.2;
	var aular2:Vector3 = new Vector3(0, _deltaX, 0.0f);
	direction.transform.Rotate(aular, Space.World);

}




function setReticle(){
	var ray : Ray;
	var hit : RaycastHit;
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ray, hit, 100)) {
	  targetGameObject = hit.collider.gameObject;
	  reticle.transform.position = targetGameObject.transform.position;
	  reticle.transform.position.y = 0.3;
	  
	} else {
	  targetGameObject = null;
	}
}



function createObject(){
	var ray : Ray;
	var hit : RaycastHit;
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ray, hit, 100)) {
	  targetGameObject = hit.collider.gameObject;
	  system.targetGameObject = targetGameObject;
	  Debug.Log(hit.point);
	  preCreateObject = Instantiate(Prefab, hit.point, Prefab.transform.rotation);
	} else {
	  targetGameObject = null;
	}
}


function removeObject(){
	var ray : Ray;
	var hit : RaycastHit;
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ray, hit, 100)) {
	  targetGameObject = hit.collider.gameObject;
	  //Debug.Log(selectedGameObject);
	  Debug.Log(hit.point);
	  //削除
	  if(targetGameObject.tag !="Terrain"){
	  	Destroy(targetGameObject);
	  }
	 
	} else {
	  targetGameObject = null;
	}

}

function toggleRotate(){
	if(!isRotate){
		isRotate = true;
	}else{
		isRotate = false;
	}
}