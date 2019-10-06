<template>
    <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            width="680">
          </el-table-column>
          <el-table-column
            label="日期"
            prop="date"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row>
          <el-col :span="24">
            <div style="padding-top: 20px;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>

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
        tableData: [],
        editFormVisible: false,
        editForm: {
          title: '',
          desc: '',
          id: ''
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pagesize: 10,
        total: 0
      }
    },
    methods: {
      getList(){
          let that = this;
          let param = new URLSearchParams();
          param.append('pageSize', this.pagesize);
          param.append('pageNumber', this.currentPage);
          that.$axios({
            method: 'post',
            url: 'http://localhost:9999/article/all_post/',
            data: param
          })
          .then(function(res){
            console.log(res);
            let len = res.data.rows.length;
            that.total = res.data.total;
            that.tableData = [];
            for(let i = 0; i<len; i++){
                that.tableData.push({
                  id: res.data.rows[i].id,
                  title: res.data.rows[i].title,
                  date: res.data.rows[i].create_time,
                  desc: res.data.rows[i].content
                });
            }
          })
          .catch(function(err){
            that.$message(err);
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.editFormVisible = true;
        this.editForm.title= row.title;
        this.editForm.desc= row.desc;
        this.editForm.id= row.id;
      },
      editSubmit(){
        let that  = this;
        let param = new URLSearchParams();

        param.append('id', this.editForm.id);
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
                that.getList();
              }else{
                that.$message.error("编辑失败");
              }
        })
        .catch(function(err){
          // console.log(err);
        })
      },
      handleDelete(index, row) {
        console.log(index, row);

        let selectedIdArr = [];
        selectedIdArr.push(row.id);
        
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
                that.getList();
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
      handleSizeChange: function (size) {
              this.pagesize = size;
              this.getList();
              console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              console.log(this.currentPage)  //点击第几页
              this.getList();
      }
    },
    mounted(){
        this.getList();
    }
  }
</script>

<style scoped>

</style>