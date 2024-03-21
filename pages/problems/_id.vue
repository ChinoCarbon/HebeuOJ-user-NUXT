<template>
  <div>
    <el-row style="height: 99vh; min-width: 1200px">
      <el-col :span="12" style="height: 100%; overflow-y: scroll">
        <div style="background-color: #69bff8; padding: 30px; border-top: white 1px solid">
          <h1 style="color: white"> Problem{{ this.$route.params.id }} &nbsp;&nbsp;&nbsp;{{ problem.problemTitle }}</h1>
        </div>
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-user"></i>
              时间限制
            </slot>
            1.0s
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-mobile-phone"></i>
              测试点个数
            </slot>
            10
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-location-outline"></i>
              提交人数
            </slot>
            {{ problem.problemSubmitted }}
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-tickets"></i>
              通过人数
            </slot>
            {{ problem.problemPassed }}
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-office-building"></i>
              难度
            </slot>
            Easy
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-office-building"></i>
              历史分数
            </slot>
            100
          </el-descriptions-item>
        </el-descriptions>
        <mavon-editor
          ref="docDetaileNode"
          v-model="article"
          :subfield="false"
          :editable="false"
          :ishljs="true"
          box-shadow-style="0 0 0 0 rgba(0,0,0,0)"
          default-open="preview"
          :toolbars-flag="false"
        />
      </el-col>
      <el-col :span="12" style="height: 100%; display: flex; flex-direction: column">
        <code-editor ref="editor" :cm-mode="editorStyle" :cm-theme="'monokai'" :read-only="false"/>
        <el-row>
          <el-col :offset="8" :span="16">
            选择语言
            <el-select v-model="selectedValue" placeholder="语言类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" @click="submit">
              <div v-if="isSubmiting===false">
                提交
              </div>
              <div v-else>
                提交中。。。
              </div>
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import codeEditor from "@/components/codeEditor/index";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  layout: 'SafariBar',

  components: {
    codeEditor
  },

  data() {
    return {
      article: '',
      title: '标题',
      code: '',
      problem: {
        problemContent: '',
        problemTitle: ''
      },
      isSubmiting: false,
      options: [{
        value: '1',
        label: 'C'
      }, {
        value: '2',
        label: 'C++'
      }, {
        value: '3',
        label: 'Java'
      },{
        value: '4',
        label: 'Python3'
      }],
      selectedValue: '4',
      localhostPath: '',

    }
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName = this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getArticle()
  },
  mounted() {

  },
  methods: {
    submit() {
      this.isSubmiting = true
      const judgeData = {
        problemId: this.$route.params.id,
        userId: JSON.parse(localStorage.getItem('user')).userId,
        code: this.$refs.editor.editorValue,
        languageType: this.selectedValue
      }
      this.$axios.post(
        'judge/getJudgementId',
        judgeData
      ).then((data) => {
        console.log(data)
        localStorage.setItem("code", this.code)
        this.isSubmiting = false
        this.$router.push({path: "/judgement/" + data.data, query: {judgeData: judgeData}})
      })
    },
    getInformation() {
      console.log(this.$route.params.id)
      this.$axios.post('problem/getProblemInformation',
        {
          problemId: this.$route.params.id
        }).then((response) => {
        this.problem = response.data.data.information;
        console.log(this.problem)
      })
    },
    getArticle() {
      this.getInformation();
      this.$axios.get("problem/problemContent/" + this.$route.params.id)
        .then((response) => {
          this.article = response.data.data.content
        })
    }
  },
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror
    },
    editorStyle() {
      const mapNumToStyle = {
        '1': 'text/x-csrc',
        '2': 'text/x-c++src',
        '3': 'text/x-java',
        '4': 'python'
      }
      return mapNumToStyle[this.selectedValue]
    }
  }
}
</script>

<style>


</style>
