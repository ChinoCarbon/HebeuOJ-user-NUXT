<template>
  <div class="hello">
     <div class="content">
      <h1>
        Entering your code.
      </h1>
      <h1>
        Improving your skill.
      </h1>
       <h5>
         学生在河北工程大学在线测评系统可以尽情练习，提升自己的代码水平。
       </h5>
       <h5>
         老师在河北工程大学在线测评系统可以实现高效管理。
       </h5>
       <el-button class="home_button" type="primary">
         Lets start!
       </el-button>
  </div>
    <div class="background_color">
    </div>
    <div class="homepage_img">
      <img src="../static/img/homepage_img.png">
    </div>

  </div>
</template>

<script>

export default {
  layout: 'SafariBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1
{
  font-size: 60px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: black;
}
h1:first-of-type {
  margin-top: 15%;
}
h1:last-of-type {
  margin-top: 1%;
}
h5 {
  font-size: 20px;
  margin-top: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: black;
}
.home_button {
  margin-top: 2%;
  font-size: 30px;
  color: white;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.hello {
  width: 100vw;
  height: 100vh;
  min-width: 1800px;
  min-height: 900px;
  overflow-y: hidden;
  position: relative;
}
.background_color {
  background-color: #ff436f;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  clip-path: ellipse(30% 63% at 88% 75%);
}

@media (max-width: 1000px) {
  .background_color {
    display: none;
  }
}

.content {
  margin-left: 15%;
}

.homepage_img {
  position: absolute;
  right: 5%;
  bottom: 0;
}

.homepage_img > img {
  width: 50vw;
  height: 50vw;
}
</style>
