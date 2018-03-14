<template>
    <div>
        <el-row class="box" >
            <el-col >
                <el-button class="tagetsbtn"  @click="addTag = true">创建标签</el-button>
                <el-dialog title="创建标签" :visible.sync="addTag">
                    <el-form :model="form1">
                        <el-form-item label="标签名" >
                            <el-input type="text" v-model="form1.name" >i</el-input>
                        </el-form-item>
                        <el-form-item label="标签背景色" >
                            <el-color-picker v-model="form1.bgcolor" size="medium"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="标签色" >
                            <el-color-picker v-model="form1.color" size="medium"></el-color-picker>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addTag = false,saveTag()">创建</el-button>
                    </div>
                </el-dialog>
            </el-col>
            <el-col :span="8" >
                <ul class="taglist">
                    <li v-for="(item,items) in taglist" :key="items"  >
                        <el-button  @click="tags(item)" :style="{color:item.tag_color,backgroundColor:item.tag_bg_color}" >{{item.tag_name}}</el-button>
                        <el-button class="update" @click="revisetag = true,tagsID(item)" >修改</el-button>
                        <el-dialog title="创建标签" :visible.sync="revisetag">
                            <el-form :model="form2">
                                <el-form-item label="标签名" >
                                    <el-input type="text" v-model="form2.name"></el-input>
                                </el-form-item>
                                <el-form-item label="标签背景色" >
                                    <el-color-picker v-model="form2.bgcolor" size="medium"></el-color-picker>
                                </el-form-item>
                                <el-form-item label="标签色" >
                                    <el-color-picker v-model="form2.color" size="medium"></el-color-picker>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="revisetag = false,updateTagInfo()">创建</el-button>
                            </div>
                        </el-dialog>
                    </li>
                </ul>
            </el-col>
            <el-col :span="16" >
                <ul>
                    <li v-for="(item,items) in icolist" :key="items">{{item}}</li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as api from '../../api/api'
    export default {
        data(){
            return {
                revisetag: false,
                addTag: false,
                revisename:'',
                revisecolor:'',
                revisebgcolor:'',
                taglist:'',
                form1:{
                    name:'',
                    color:'#409EFF',
                    bgcolor:'#409EFF',
                },
                form2:{
                    name:'',
                    color:'#409EFF',
                    bgcolor:'#409EFF',
                },
                icolist:'',
                tag_id:''
            }
        },
        mounted:function(){
            this.get();
        },
        components: {
        },
        methods: {
            //进入页面查询标签列表
            get(){
                api.getTagList({
                }).then(data =>{
                    this.taglist = data;

                })
            },
            //保存标签
            saveTag(){
                api.addTag({
                    tag_name:this.form1.name,
                    tag_color:this.form1.color,
                    tag_bg_color:this.form1.bgcolor,
                }).then(data =>{
                    alert('创建成功！');
                    this.get();

                })
            },
            //传id
            tagsID(item){
                this.tag_id = item.id;
                this.form2.name = item.tag_name;
            },
            //修改标签
            updateTagInfo(){
                api.updateTagList({
                    tag_id:this.tag_id,
                    tag_name:this.form2.name,
                    tag_color:this.form2.color,
                    tag_bg_color:this.form2.bgcolor,
                }).then(data =>{
                    alert('修改成功！');
                    this.get();

                })
            },
            //点击标签查看币列表
            tags(item){
                console.log(item.id)
                api.getTagIcoList({
                    tagId:item.id,
                }).then(data=>{
                    this.icolist = data;
                })
            },


        }
    }
</script>

<style scoped>

    .tagetsbtn{
        margin:1% 3%;
    }
    .box{margin:2%;height:100vh;border: 1px solid #ccc;
    }
    .el-col-24{border-bottom:1px solid #ccc;}
    .el-col-8 {
        border-right: 1px solid #cccccc;
        height: 100vh;

    }
    ul li{
        height: 50px;border-bottom: 1px solid #cccccc;
        text-align: center;
        line-height: 50px;
    }
    .taglist li .el-button{
        width: 12vh;
    }


</style>
