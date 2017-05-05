var path=require('path');



module.exports={
	entry:'./index.js',
	output:{
		filename:'JMQuery.js',
		path:path.resolve(__dirname,'dist')
	}
}