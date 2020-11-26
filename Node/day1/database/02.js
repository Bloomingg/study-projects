const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

//创建集合规则
const courseSchema = new mongoose.Schema({
  name:String,
  author:String,
  isPublished:Boolean
})

//使用规则创建集合
const Course = mongoose.model('Course',courseSchema)

// 向集合中插入文档
Course.create({
  name:'C++基础',
  author:'xiaoli',
  isPublished:false
}).then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})