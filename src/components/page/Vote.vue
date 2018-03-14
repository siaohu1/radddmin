<template>
    <div>
    <div class="header">
        <div class="logo">新增投票</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <img class="user-logo" src="../../../static/img/gai.jpeg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
        <div class="fanhui" @click='goBack'><i class="el-icon-arrow-left" style="margin-left: 30%"></i></div>
       <el-row :gutter="20" style="margin-left: 40%;margin-top: 3%">
           <div style="margin-bottom: 20px">新增投票</div>
           <el-upload
               action="123"
               :http-request="requestImg"
               :before-upload="beforeAvatarUpload"
               enctype="multipart/form-data"
               list-type="picture-card">
               <i class="el-icon-plus"></i>
           </el-upload>
           <el-dialog :visible.sync="dialogVisible" >
               <img width="100%" :src="dialogImageUrl" alt="">
           </el-dialog>

            <el-form style="margin-top:30px;">
                <el-form-item label="项目名称">
                    <el-col :span="5">
                    <el-input v-model="itemName"></el-input>
                </el-col>
                </el-form-item>
                 <el-form-item >
                  <el-button @click="addVoteProject()" style="margin-left: 6%">保存</el-button>
                </el-form-item>

            </el-form>

       </el-row>

    </div>
</template>
<script>
    import * as apiRequest from '../../api/api'
    var myToken = localStorage.token;
    export default {
        data(){
            return {
                itemName:'',
                username:'admin',
                jumpindustrypage: false, //跳转编辑行业
                icondata:'',//获取到的图标数据
                url:'',
                dialogImageUrl: '',
                dialogVisible: false,
                picUrl:'',
                imgFile:'',
                imageUrl: '' ,
                dialogFormVisible: false,
                form:{
                    name:''
                },
                icoList:''
            }
        },
        mounted(){


        },
        created(){
            // this.queryitemlist();
        },
        methods:{
             goBack(){
                    this.$router.go(-1);
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },

            //新建投票项目
            addVoteProject(){
                 apiRequest.newAddVote({
                     voteName:this.itemName,
                     votePic:this.imageUrl
                 }).then(()=>{
                     alert('新增成功');
                     this.$router.push('/votingList');
                 })
            },

            progress(event, file, fileList){
                console.log(file)
            },
            beforeAvatarUpload(file) {
                this.imgFile= file;
            },
            requestImg(){//上传图片
                let fileValue = document.querySelector('.el-upload .el-upload__input');
                let url = "https://bit.macsen318.com/btoken/api/upload";
                let formData = new FormData();
                let imgData  = new FormData(fileValue.files[0]);
                formData.append('file', this.imgFile);
                formData.append('sys', 'admin')
                formData.append('token', myToken);
                let xhr = new XMLHttpRequest()
                xhr.open('POST', url, true)
                xhr.send(formData)
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        let responseText  =  xhr.responseText;
                        let responseData  = JSON.parse(responseText);
                        this.imageUrl = responseData.data.url;
                    }
                }
            },

        }
    }

</script>
<style scoped lang="less">
 /* header样式 */

    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .fanhui{
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        padding: 10px 0 0 20px;
    }


</style>
