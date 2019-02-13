const sanitizeHTML = require('sanitize-html');

module.exports = function(url,callback){
  const mongoose = require('mongoose');
  mongoose.connect(url,callback);

  const messageSchema = new mongoose.Schema(
    {
	username:{
	  type:String,
	  required:true
	},
	text:{
	  type:String,
	  required:true
	}
    },
    {strict:'throw'}
);

  const Message = mongoose.model(
    'messages',
    messageSchema
  );

  return {
    create:function(newMessage,callback){
	try{
	    var msg = new Message(newMessage);
	} catch(exception){
	    return callback('Unable to create Message');
	}
  if(msg.username){
    msg.username = sanitizeHTML(msg.username);
  }
  if(msg.text){
    msg.text = sanitizeHTML(msg.text);
  }
	msg.save(callback);
    },
    read:function(id,callback){
      Message.findById(id, callback);
    },
    readUsername:function(username,callback){
      if(typeof username !== 'string'){
        return callback('Unable to parse username.');
      }
      Message.find({ username: username },callback);
    },
    readAll:function(callback){
      Message.find({},callback);
    },
    update:function(id,updatedMessage,callback){
      Message.findByIdAndUpdate(id,updatedMessage,callback);
    },
    delete:function(id,callback){
      Message.findByIdAndRemove(id,callback);
    },
    deleteAll:function(callback){
      Message.remove({},callback);
    },
    disconnect:function(){
      mongoose.disconnect();
    }
  };
};
