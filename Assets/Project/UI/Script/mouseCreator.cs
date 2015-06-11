using UnityEngine;
using System.Collections;

public class mouseCreater : MonoBehaviour {
	const float RaycastMaxDistance = 100.0f;

	RaycastHit hit;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetMouseButtonDown(0)) {
			Vector2 clickPos = Input.mousePosition;
			Ray ray = Camera.main.ScreenPointToRay(clickPos);

			/*
			
			if(Physics.Raycast(ray,out, hit, 100)) {
			    selectedGameObject = hit.collider.gameObject;
			    Debug.Log(selectedGameObject);
			}else{
			    selectedGameObject = null;
			}
			*/

		}
	
	}
}
