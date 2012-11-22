/**

_enyo.FormData_ is a portable [XHR2]() implementation made to send
`multipart/form-data` Ajax requests.

It is largally inspired by From
[html5-formdata](https://github.com/francois2metz/html5-formdata/blob/master/formdata.js)

    Emulate FormData for some browsers
    MIT License
    (c) 2010 Francois de Metz

 */
(function(w) {
	if (w.FormData) {
		enyo.FormData = w.FormData;
		return;
	}
	function FormData() {
		this.fake = true;
		this._fields = [];
		// This generates a 50 character boundary similar to
		// those used by Firefox.  They are optimized for
		// boyer-moore parsing.
		this.boundary = '--------------------------';
		for (var i = 0; i < 24; i++) {
			this.boundary += Math.floor(Math.random() * 10).toString(16);
		}
	}
	FormData.prototype.append = function(key, value) {
		this._fields.push([key, value]);
	};
	FormData.prototype.toString = function() {
		var boundary = this.boundary;
		var body = "";
		this._fields.forEach(function(field) {
			body += "--" + boundary + "\r\n";
			// file upload
			if (field[1].name) {
				var file = field[1];
				body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ file.name +"\"\r\n";
				body += "Content-Type: "+ file.type +"\r\n\r\n";
				body += file.getAsBinary() + "\r\n";
			} else {
				body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
				body += field[1] + "\r\n";
			}
		});
		body += "--" + boundary +"--";
		return body;
	};
	enyo.FormData = FormData;
})(window);
