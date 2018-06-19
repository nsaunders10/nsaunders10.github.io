function Datboi()
{
	var page=document.getElementById("page");

	var wm=new WindowManager(page);
	wm.setPresetStyle("win10");
	var win=wm.createWindow({top:50,left:200,width:400,height:550,title:'Here come dat boi'});
	var win_div=win.getContentDiv();
	
	var windowHolder=document.createElement("div");
	vn.set(windowHolder.style,{
		position:'absolute',
		width: '100%',		
		height:'100%',
		backgroundImage: 'url(https://www.visineat.com/devs/dev5/Images/Dat_boi)',
		backgroundSize: '100%',
		//backgroundColor: 'black',
		backgroundRepeat: 'no-repeat',
	});
	win_div.appendChild(windowHolder);
	
}
function URL(url){
	var page=document.getElementById("page");
	var wm=new WindowManager(page);
	var w=new VNBrowserWindow(wm,{url:url});
	
}
function Chat(){
	
var nickname=null;
var me=null;
var message=null;
var counter=null;
var url=null;
var isUrl = false;

	var page=document.getElementById("page");
	var wm=new WindowManager(page);
	wm.setPresetStyle("win10");
	
	var win=new VNConsoleWindow(wm,{left:500,top:100,width:400,height:300,title:'Chat'});
	 
	
win.whenCommandEntered().then(function(command)
	{
		if(command=='clr') win.clear();
		else if(command.startsWith('name='))
		{ 	
			nickname = (command.slice(5));
			win.println('Your name is now: '+nickname);
		}
		else if(command=='chat')
		{ 	
			Chat();
		}
	/*	else if(command.startsWith('url='))
		{
			url = (command.slice(4));
			var w=new VNBrowserWindow(wm,{url:url});
			isUrl = true;
		}
		*/
		else
		{	
			message.set(command);
		}
	});
	
	var server=new VNServer();
	
	server.connect('Chat',{capacity:2,releaseSeats:false}).then(function(my_session){	
		me=server.me();
		var my_session=server.getSession();
		var user = null;

		
		counter=my_session.variable('counter');
		counter.changeBy(1);
		counter.whenValueChanged().then(function(variable,initiator)
		{	
			win.println('Users In Room: '+counter.value());
		});
		
		
		message=my_session.variable('message');
		message.set('');
		message.whenValueChanged().then(function(user,variable,initiator)
		{	
			if(message.value()!='')
			win.println(message.value());
		
			if(message.value()=='oshitwaddup'){
				
				Datboi();
			}
			if(message.value()=='url='){
				message.slice(4);
				URL(url);
				
			}
			if(message.value()=='vidchat')
			WebCam();
		
		});
	/*	url=my_session.variable('url');
		url.set('');
		url.whenValueChanged().then(function(user,variable,initiator)
		{	
					
			if(isUrl){
				var w=new VNBrowserWindow(wm,{url:url});
				isUrl=false;
				
			}
		
		});
		*/
		nickname= me.variable('nickname');
		nickname.set('Anonymous');
		nickname.whenUsersValueChanged().then(function(variable,initiator)
		{	

		});
		
	});

	
	server.whenConnected().then(function(session){
		win.println('You are connected!');
	
	});
	
	
}

function WebCam(){
	var page=document.getElementById("page");
	var wm=new WindowManager(page);
	//var win=wm.createViewerWindow({top:50,left:200,width:400,height:550,title:'Video Chat'});
	
	var media_system=new MediaSystem({audio:true,video:true});
	media_system.getWebCam().onTurnOn=function(){console.log('My camera is on!')};
	media_system.getMicrophone().onTurnOn=function(){console.log('My mic is on!')};
}