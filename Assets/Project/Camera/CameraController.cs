using UnityEngine;
using System.Collections;
 
namespace CameraController
{
	enum MouseButtonDown
	{
		MBD_LEFT = 0,
		MBD_RIGHT,
		MBD_MIDDLE,
	};
 
	public class CameraController : MonoBehaviour
	{
		[SerializeField]
		private Vector3 focus = Vector3.zero;
		[SerializeField]
		public GameObject focusObj = null;
 
		private Vector3 oldPos;

 
		void setupFocusObject(string name)
		{
			GameObject obj = this.focusObj = new GameObject(name);
			obj.transform.position = this.focus;
			obj.transform.LookAt(this.transform.position);
 
			return;
		}
 
		void Start ()
		{
			if (this.focusObj == null)
				this.setupFocusObject("CameraFocusObject");

			Transform trans = this.transform;
			transform.parent = this.focusObj.transform;
 
			trans.LookAt(this.focus);
 
			return;
		}
	
		void Update ()
		{
			this.mouseEvent();

			keyTransport();
 
			return;
		}
 
		void mouseEvent()
		{
			float delta = Input.GetAxis("Mouse ScrollWheel");
			if (delta != 0.0f)
				this.mouseWheelEvent(delta);
 
			if (Input.GetMouseButtonDown((int)MouseButtonDown.MBD_LEFT) ||
				Input.GetMouseButtonDown((int)MouseButtonDown.MBD_MIDDLE) ||
				Input.GetMouseButtonDown((int)MouseButtonDown.MBD_RIGHT))
				this.oldPos = Input.mousePosition;
 
			this.mouseDragEvent(Input.mousePosition);
 
			return;
		}
 
		void mouseDragEvent(Vector3 mousePos)
		{
			Vector3 diff = mousePos - oldPos;
 
			if (Input.GetMouseButton((int)MouseButtonDown.MBD_LEFT))
			{
 
			}else if (Input.GetMouseButton((int)MouseButtonDown.MBD_MIDDLE))
			{
				if (diff.magnitude > Vector3.kEpsilon)
					this.cameraRotate(new Vector3(diff.y, diff.x, 0.0f));
			}
 
			this.oldPos = mousePos;
 
			return;
		}
		public void keyTransport(){
			if(Input.GetKeyDown(KeyCode.W)){
				this.transform.position += this.transform.forward;
			}else if(Input.GetKeyDown(KeyCode.S)){
				this.transform.position -= this.transform.forward;
			}else if(Input.GetKeyDown(KeyCode.A)){
				this.transform.position -= this.transform.right;
			}else if(Input.GetKeyDown(KeyCode.D)){
				this.transform.position += this.transform.right;
			}


		}
 
		public void mouseWheelEvent(float delta)
		{
			Vector3 focusToPosition = this.transform.position - this.focus;
 
			Vector3 post = focusToPosition * (1.0f - delta);
 
			if (post.magnitude > 0.01)
				this.transform.position = this.focus + post;
 
			return;
		}
 
		
		public void cameraRotate(Vector3 eulerAngle)
		{
			Transform focusTrans = this.focusObj.transform;
			focusTrans.localEulerAngles = focusTrans.localEulerAngles + eulerAngle;
			this.transform.LookAt(this.focus);
 
			return;
		}
	}
}