<template>
    <div>
          <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column prop="title" label="标题" width="280"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                      <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
          </el-table>

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
                <el-button @click.native="editFormVisible = false">取消</el-button>
				        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          editFormVisible: false,
          editLoading: false,
          editForm: {
            title: '',
            desc: ''
          },
          formLabelWidth: '120px',
          tableData: [],
          multipleSelection: []
        }
      },
      methods: {
        	//获取用户列表
          getUsers() {
              let that  = this;
              let param = new URLSearchParams();
              param.append('pageSize', '100');
              param.append('pageNumber', '1');
              
              that.$axios({
                method: 'post',
                url: 'http://localhost:9999/article/all2/',
                data: param
              })
              .then(function(res){
                console.log(res.data.rows);
                that.tableData = [];
                let len = res.data.rows.length;
                for(let i = 0; i<len; i++){
                    that.tableData.push({
                      date: res.data.rows[i].create_time,
                      title: res.data.rows[i].title,
                      desc: res.data.rows[i].content.substring(0, 30)
                    });
                }

                console.log(that.tableData);
              })
              .catch(function(err){
                console.log(err);
              })
          },
          //删除
          handleDel: function (index, row) {
                let that  = this;
                let param = new URLSearchParams();
                let ids = [];
                ids.push(row.id);
                param.append('ids', ids);

                this.$confirm('确认删除该记录吗?', '提示', {
                      type: 'warning'
                }).then(() => {
                      //this.listLoading = true;
                      //NProgress.start();
                      that.$axios({
                        method: 'post',
                        url: 'http://localhost:9999/article/delete/',
                        data: param
                      })
                      .then(function(res){
                          //this.listLoading = false;
                          //NProgress.done();
                          that.$message({
                            message: '删除成功',
                            type: 'success'
                          });
                          that.getUsers();
                      })
                      .catch(function(err){
                        console.log(err);
                      })
                }).catch(() => {

                });
          },
          //显示编辑界面
          handleEdit: function (index, row) {
              this.editFormVisible = true;
              this.editForm = Object.assign({}, row);
          },
          //编辑
          editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
              if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                  this.editLoading = true;
                  //NProgress.start();
                  let para = Object.assign({}, this.editForm);
                  para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                  editUser(para).then((res) => {
                    this.editLoading = false;
                    //NProgress.done();
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                    this.$refs['editForm'].resetFields();
                    this.editFormVisible = false;
                    this.getUsers();
                  });
                });
              }
            });
          },
      },
      mounted(){
          this.getUsers();
      }
    }
</script>

<style scoped>

</style>