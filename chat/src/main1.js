function setup()
{	
var me=null;
var message=null;
var counter=null;

	var server=new VNServer();
	
	server.connect('Chat',{capacity:10,releaseSeats:false}).then(function(my_session){	
		me=server.me();
		var my_session=server.getSession();
		var user = null;
		
		counter=my_session.variable('counter');
		counter.changeBy(1);
		counter.whenValueChanged().then(function(variable,initiator)
		{	
			console.log('Users In Room: '+counter.value());
		});
		
		message=my_session.variable('message');
		message.set('');
		message.whenValueChanged().then(function(user,variable,initiator)
		{	
			if(message.value()!='')
			message.set(chatValue);
		});
		
	});

	
	server.whenConnected().then(function(session){
		console.log('You are connected!');
	
	});
}
