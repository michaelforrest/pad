function OpenidConsumer(options){
    var openid_url;
    
    function OpenidConsumer(){
        openid_url = options.openid_url;
    }
	
    this.getBeginUrl = function(options){
		if(!options) throw("getBeginUrl requires an options hash of the form: {return_to_path:'/path/to/return?something', base:'http://server.name'}")
		if(!options.return_to_path) throw("must supply return_to_path");
		if(!options.base) throw ("must supply base url"); 
	    var params = {
			'assoc_handle':getAssocHandle(),
			'ax.mode':'fetch_request',
			'claimed_id':'http://specs.openid.net/auth/2.0/identifier_select',
			'identity':'http://specs.openid.net/auth/2.0/identifier_select',
			'mode':'checkid_setup',
			'ns':'http://specs.openid.net/auth/2.0',
			'ns.ax':'http://openid.net/srv/ax/1.0',
			'ns.sreg':'http://openid.net/extensions/sreg/1.1',
			'realm':options.base,
			'return_to':options.base + options.return_to_path + '&open_id_complete=1' // Assuming the return-to url has a ? in it
		}
		if(options.required) params['sreg.required'] = options.required;
   		var result = [];
		for(var e in params) result.push([escape('openid.'+e)] +"=" +escape(params[e]));
        return openid_url + '?' + result.join('&'); // Assuming the openid url didn't have a ? in it already 
    }
	function getAssocHandle(){
		return "foo";
	}
	
	this.completeLogin = function(params){
		// TODO: verify that this came from where I think it came from	
		this.nickname = params['openid.sreg.nickname'];
		
		encodedForm = '';
		for(var key in params)
		{
			if(key.match(/^openid\./) != null)
				encodedForm = encodedForm + key + ':' + params[key] + "\n";
		}
		console.log(SHA1(encodedForm));
		
		return true;
	}
	
    OpenidConsumer();
}
