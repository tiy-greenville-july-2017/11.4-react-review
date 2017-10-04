import {ParseModel, ParseCollection} from '../parse';


var Message = ParseModel.extend({

});

var MessageCollection = ParseCollection.extend({
  model: Message,
  url: 'https://dietz-server.herokuapp.com/classes/ChatMessage?include=owner'
});

export {MessageCollection as default, Message};
