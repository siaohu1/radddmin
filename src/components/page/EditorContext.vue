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
        <div class="fanhui" @click='goBack'><i class="el-icon-arrow-left" style="margin-left: 3%"></i></div>
        <div class="context">
            <div class="context-top">
                <div class="context-name">BTC</div>
                <div class="context-button">
                    <!--<el-button @click="saveChap()">保存草稿</el-button>-->
                    <el-button @click="saveChap">保存发布</el-button>
                </div>
            </div>
            <div class="context-bottom">
                <div class="item-list">
                    <ul v-for="(list, index) in chapterLists">
                        <li @click="editChap(index)">{{list.chapterTitle}}<span @click="delChap(list.chapterId)">x</span></li>
                    </ul>
                    <div class="addCount" @click="">
                        <el-input type="text" v-model="newChapName" placeholder="添加章节"></el-input>
                    </div>
                </div>
                <div class="editor-context">
                    <el-input
                        type="textarea"
                        :rows="25"
                        placeholder="请输入内容"
                        v-model="textarea"
                    >
                    </el-input>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import * as apiRequest from '../../api/api'
    export default {
        data() {
            return {
                username: 'admin',
                textarea: '',
                chapName:'',
                chapterLists:[],
                curId: '',
                newChapName: ''
            }
        },
        mounted(){
            this.getChapterLists();
        },
        watch: {
          newChapName(val) {
            this.chapName = val
          }
        },
        methods:{
            getChapterLists(projectId = this.$route.query.id){
                apiRequest.getChapterList({
                    projectId
                }).then(data=>{
                    this.chapterLists = data.chapterList;
                    console.log(this.chapterLists);
                })
            },
            delChap(chapterId){
                apiRequest.delChapter({
                    chapterId
                }).then(()=>{
                    this.getChapterLists();
                })
            },
            editChap(index) {
              this.curId = this.chapterLists[index].chapterId
              this.textarea = this.chapterLists[index].chapterContent
              this.chapName = this.chapterLists[index].chapterTitle
            },
            saveChap(){
              let projectId = this.$route.query.id
                apiRequest.ediChap({
                    projectId,
                    charpterId: this.curId || undefined,
                    chapter_title:this.chapName,
                    chapter_content:this.textarea,
                    status:0,
                }).then(()=>{
                    alert('保存草稿成功')
                    this.chapName='';
                    this.textarea=''
                    this.curId = ''
                    this.chapName = ''
                    this.getChapterLists();
                })
            },
            goBack(){
                this.$router.go(-1);
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            open3() {
                this.$prompt('请输入章节名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    alert(value);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }

</script>
<style scoped lang="less">
    .context{
        padding: 1% 10%;
        width: 1152px;
        .context-top{
            height: 100px;
            border: 1px solid #ccc;
            line-height: 100px;
            .context-name{
                font-size: 30px;
                font-weight: bold;
                float: left;
                margin-left: 30px;
            }
            .context-button{
                float: right;
                margin-right: 30px;
            }
        }
        .context-bottom{
            .item-list{
                width: 200px;
                float: left;
                height: 600px;
                border: 1px solid #ccc;
                ul{
                    cursor: pointer;
                    li{
                        text-align: left;
                        border: 1px solid #ccc;
                        height: 70px;
                        line-height: 70px;
                        font-size: 6px;
                        font-weight: 900;
                        padding-left: 10px;
                        span{
                            font-size: 25px;
                            font-weight: bold;
                            margin-right: 10px;
                            float: right;
                        }
                }

                }
                .addCount{
                    text-align: center;
                    border: 1px solid #ccc;
                    height: 70px;
                    line-height: 70px;
                    font-size: 20px;
                    font-weight: 900;
                    cursor: pointer;
                    span{
                        font-size: 30px;
                        font-weight: bold;
                        margin-right: 20px;
                    }
                }
            }
            .editor-context{
                    border: 1px solid #ccc;
                    float: left;
                    width: 888px;
                    height: 540px;
                    padding: 30px;
            }
        }
    }
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
