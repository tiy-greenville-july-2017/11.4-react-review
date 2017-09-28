var Backbone = require('backbone');
import {ParseModel} from '../parse';

var ParseFile = ParseModel.extend({
  urlRoot: function(){
    return 'https://tiny-parse-server.herokuapp.com/files/' + this.get('name');
  }
});


export default ParseFile;
