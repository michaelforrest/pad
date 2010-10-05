ConsumerTest = TestCase("ConsumerTest");

ConsumerTest.prototype.setUp = function(){
	this.consumer = new OpenidConsumer( {openid_url: "https://login.launchpad.net/+openid"} );
	this.params = {
		'openid.op_endpoint':'https://login.launchpad.net/+openid',
		'openid.signed':'assoc_handle,claimed_id,identity,invalidate_handle,mode,ns,ns.sreg,op_endpoint,response_nonce,return_to,signed,sreg.nickname',
		'openid.sig':'TYRoYZcYNm9Uh3bA8N3Im5cC2ps=',
		'openid.response_nonce':'2010-09-03T11:25:39ZDf9KwX',
		'openid.claimed_id':'https://login.launchpad.net/+id/ref466F',
		'openid.assoc_handle':'{HMAC-SHA1}{4c80db33}{muvwTA==}',
		'openid.sreg.nickname':'michaelforrest',
		'openid.ns':'http://specs.openid.net/auth/2.0',
		'openid.identity':'https://login.launchpad.net/+id/ref466F',
		'openid.ns.sreg':'http://openid.net/extensions/sreg/1.1',
		'openid.mode':'id_res',
		'openid.invalidate_handle':'lalalalalalaaaaaa',
		'openid.return_to':'http://localhost:9000/ep/openid/?foo=bar&open_id_complete=1'
	};
}

ConsumerTest.prototype.testBegin = function(){
	
	//assertEquals("error message",consumer.getBeginUrl() );
	assertEquals("https://login.launchpad.net/+openid?openid.assoc_handle=foo&openid.ax.mode=fetch_request&openid.claimed_id=http%3A//specs.openid.net/auth/2.0/identifier_select&openid.identity=http%3A//specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http%3A//specs.openid.net/auth/2.0&openid.ns.ax=http%3A//openid.net/srv/ax/1.0&openid.ns.sreg=http%3A//openid.net/extensions/sreg/1.1&openid.realm=http%3A//localhost%3A9000&openid.return_to=http%3A//localhost%3A9000/ep/openid/%3Ffoo%3Dbar%26open_id_complete%3D1&openid.sreg.required=email%2Cnickname%2Cfullname",
					this.consumer.getBeginUrl({base: 'http://localhost:9000', 
										  		return_to_path:'/ep/openid/?foo=bar',
										  		required:'email,nickname,fullname'  }));
	
}
ConsumerTest.prototype.testCompleteLogin = function(){
	assert('should validate response correctly',this.consumer.completeLogin(this.params));
	assertEquals("michaelforrest",this.consumer.nickname); 
	
}
ConsumerTest.prototype.testInjective = function(){
	var keyValueForm1 = this.consumer.keyValueFormEncode(this.params);
	this.params['openid.response_nonce'] = 'hello';
	var keyValueForm2 = this.consumer.keyValueFormEncode(this.params);
	
	assertNotEquals(keyValueForm1, keyValueForm2);
}