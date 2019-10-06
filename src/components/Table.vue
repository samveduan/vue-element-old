<template>
    <div>
          <el-row>
            <el-col :span="24">
              <div>
                <el-button-group>
                  <el-button type="success" icon="el-icon-plus" @click="add_table">添加</el-button>
                  <el-button type="success" icon="el-icon-edit" @click="open_table">编辑</el-button>
                  <el-button type="success" icon="el-icon-minus" @click="delete_table">删除</el-button>
                </el-button-group>
              </div>
            </el-col>
          </el-row>
          <div id="table"></div>

          <!--添加界面-->
          <el-dialog title="添加内容" :visible.sync="addFormVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="addForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" prop="desc">
                    <el-input v-model="addForm.desc" type="textarea" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('addForm'); addFormVisible = false">取消</el-button>
				        <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>

      		<!--编辑界面-->
          <el-dialog title="编辑内容" :visible.sync="editFormVisible">
            <el-form :model="editForm" ref="editForm">
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="editForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input v-model="editForm.desc" type="textarea" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="resetForm('editForm'); editFormVisible = false">取消</el-button>
				        <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
      data() {
        return {
            articlesTable: {},
            addFormVisible: false,
            editFormVisible: false,
            addForm: {
              title: '',
              desc: ''
            },
            rules: {
              title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { min: 2, message: '标题不能为空', trigger: 'blur' }
              ],
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
            },
            editForm: {
              title: '',
              desc: ''
            },
            formLabelWidth: '120px'
        };
      },
      methods: {
          add_table(){
              this.addFormVisible = true;
          },
          addSubmit(formName){
            let that = this;
            this.$refs[formName].validate(valid => {
              if(valid){
                  let param = new URLSearchParams();
                  param.append('title', this.addForm.title);
                  param.append('content', this.addForm.desc);
                  that.$axios({
                    method: 'post',
                    url: 'http://localhost:9999/article/add/',
                    data: param
                  })
                  .then(function(res){
                        if(res.data.ret){
                          that.$notify.success({
                            title: '成功',
                            message: '添加成功'
                          });
                          that.$refs["addForm"].resetFields();
                          that.addFormVisible = false;
                          that.articlesTable.bootstrapTable('refresh');
                        }else{
                          that.$message(res.data.msg);
                        }
                  })
                  .catch(function(err){
                    that.$message(err);
                  })
              }else{
                //console.log('error submit!!');
                return false;
              }
            })
          },
          open_table(){
              let that  = this;
              let param = new URLSearchParams();

              let selectedData = this.articlesTable.bootstrapTable('getSelections');
              let len = selectedData.length;
              
              if(len == 0){
                that.$notify.warning({
                  title: '提示',
                  message: '请选择要编辑的内容'
                });
                return;
              }else if(len > 1){
                this.$message.warning('一次只能编辑一条数据！');
                return;
              }
  
              this.editFormVisible = true;
              param.append('id', selectedData[0].id);
              
              that.$axios({
                method: 'post',
                url: 'http://localhost:9999/article/get_a_article/',
                data: param
              })
              .then(function(res){
                    if(res.data.ret){
                      that.editForm.title = res.data.title;
                      that.editForm.desc = res.data.content;
                    }else{
                      that.$message(res.data.msg);
                    }
              })
              .catch(function(err){
                that.$message(err);
              })
          },
          editSubmit(){
              let that  = this;
              let selectedData = this.articlesTable.bootstrapTable('getSelections');
              let param = new URLSearchParams();

              param.append('id', selectedData[0].id);
              param.append('title', this.editForm.title);
              param.append('content', this.editForm.desc);

              that.$axios({
                method: 'post',
                url: 'http://localhost:9999/article/edit/',
                data: param
              })
              .then(function(res){
                    if(res.data.ret){
                      that.$message.success("编辑成功！");
                      that.editFormVisible = false;
                      that.articlesTable.bootstrapTable('refresh');
                    }else{
                      that.$message.error("编辑失败");
                    }
              })
              .catch(function(err){
                // console.log(err);
              })
          },
          delete_table(){
              //this.editFormVisible = true;
              let selectedData = this.articlesTable.bootstrapTable('getSelections');
              let len = selectedData.length;
              
              if(len == 0){
                this.$message.warning("请选择要删除的用户！");
                return;
              }
              
              let selectedIdArr = [];
              for(var i = 0; i<len; i++){
                selectedIdArr.push(selectedData[i].id);
              }
              
              let that  = this;
              let param = new URLSearchParams();
              param.append('ids', JSON.stringify(selectedIdArr));
              // console.log(selectedIdArr);
              
              that.$axios({
                method: 'post',
                url: 'http://localhost:9999/article/delete/',
                data: param
              })
              .then(function(res){
                    if(res.data.ret){
                      that.$message.success("删除成功");
                      that.articlesTable.bootstrapTable('refresh');
                    }else{
                      that.$message.error("删除失败");
                    }
              })
              .catch(function(err){
                // console.log(err);
              })
          },
          resetForm(formName){
              this.$refs[formName].resetFields();
          },
          editArticle: function(){
            alert("hello");
          }
      },
      mounted(){
          function editArticle(){
              alert('hello');
          }

          this.articlesTable = $('#table').bootstrapTable('destroy').bootstrapTable({
              url: 'http://localhost:9999/article/all/',
              method: 'GET',
              dataType: "json",
              uniqueId: 'id',
              striped: false,
              cache: false,
              sortName: 'id',
              sortable: false,
              sortOrder: 'desc',
              sidePagination: "server",
              undefinedText: '--',
              singleSelect: false,
              toolbar: '#soft-toolbar',
              search: false,
              strictSearch: true,
              clickToSelect: true,
              pagination: true,
              pageNumber: 1,
              pageSize: 5,
              pageList: [5, 10, 20, 50, 100],
              paginationPreText: "上一页",
              paginationNextText: "下一页",
              queryParamsType: "",
              queryParams : function (params) {
              var temp = {
                'pageSize' : params.pageSize,
                'pageNumber' : params.pageNumber,
                'searchText': params.searchText,
                'sortName': params.sortName,
                'sortOrder': params.sortOrder
              };
              return temp;
              },
              columns: [
                  {
                    checkbox: true,
                    width: '2%'
                  },{
                    field: 'title',
                    title:'标题',
                    width: '60%'
                  },{
                    field: 'create_time',
                    title:'创建时间',
                    width: '28%'
                  },{
                    title:'编辑',
                    formatter: function(value, row, index){
                      return '<a class="btn btn-default btn-xs" @click="this.editArticle(' + row.id + ')"><i class="glyphicon glyphicon-pencil"></i><span> 编辑</span></a>'	;
                    },
                    width: '10%'
                  }
              ],
              onLoadError: function () {
                  //toastr.error("数据加载失败！", "错误提示");
              },
              onClickRow: function (row, $element) {
                  //	EditViewById(id, 'view');
                  //  console.log(row);
              }
          });
      }
    }
</script>

<style scoped>
#table{
  padding: 0;
}
</style>