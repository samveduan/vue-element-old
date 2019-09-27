<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="部门名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="存储服务器" prop="server">
            <el-select v-model="ruleForm.server" placeholder="请选择活动区域">
            <el-option label="MMJ1" value="mmj1"></el-option>
            <el-option label="MMJ2" value="mmj2"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="机构属性" prop="org">
            <el-radio-group v-model="ruleForm.org">
            <el-radio label="部门"></el-radio>
            <el-radio label="单位"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="描述" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          server: '',
          org: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          server: [
            { required: true, message: '请选择服务器类型', trigger: 'change' }
          ],
          org: [
            { required: true, message: '请选择机构属性', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>