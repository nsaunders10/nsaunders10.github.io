function setup()
{	
var nickname=null;
var me=null;
var message=null;
var counter=null;
var url=null;

	var page=document.getElementById("page");
	var wm=new WindowManager(page);
	wm.setPresetStyle("win10");
	
	var win=new VNConsoleWindow(wm,{left:100,top:100,width:400,height:300,title:'Chat Console'});
	 
	win.setCanClose(false);
	
win.whenCommandEntered().then(function(command)
	{
		if(command=='clr') win.clear();
		else if(command.startsWith('name='))
		{ 	
			nickname = (command.slice(5));
			win.println('Your name is now: '+nickname);
		}
		else if(command.startsWith('url='))
		{
			url = (command.slice(4));
			var w=new VNBrowserWindow(wm,{url:url});
			isUrl = true;
		}
		
		else
		{	
			message.set(command);
		}
	});

	var server=new VNServer();
	
	server.connect('Chat',{capacity:10,releaseSeats:false}).then(function(my_session){	
		me=server.me();
		var my_session=server.getSession();
		var user = null;

		
		counter=my_session.variable('counter');
		counter.changeBy(1);
		counter.whenValueChanged().then(function(variable,initiator)
		{	
			win.println('Users In Room: '+counter.value());
		});
		
	/*	for(var user_id in my_session.getUsers()){
			console.log(my_session.getUser(user_id));
			user = my_session.getUser()[user_id];
			}
		*/
		
		message=my_session.variable('message');
		message.set('');
		message.whenValueChanged().then(function(user,variable,initiator)
		{	
			if(message.value()!='')
			win.println(message.value());
		
			if(message.value()=='oshitwaddup'){
				
				Datboi();
			}
			
			if(message.value()=='vidchat')
			WebCam();
		
		});
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
