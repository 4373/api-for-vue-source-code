<style scoped>
    .flex-row {
      display: flex;
      padding: 5px;
    }
  
    .flex-t {
      flex: 100px 0 0;
      text-align: right;
      padding-top: 8px;
      color:#757575;
    }
    .ie-r{
      border-bottom: 1px dotted #ddd;
      padding: 5px;
      position: relative;
    }
    .ie-t{
      width:80px;
      text-align: right;
      font-weight: bold;
      position: absolute;
      left:0;
      top:5px;;
    }
    .ie-c{
      margin-left: 100px;
      width:90px
    }
    .flex-c {
      flex: auto;
      padding-left: 10px;
      vertical-align: bottom;
    }
    .flex-c .ivu-checkbox-wrapper, .flex-c .ivu-radio-group{
      padding-top: 6px !important;
    }
    .text{
      margin-top: 8px;
    }
    @media screen and (max-width: 767px) {
      .flex-row{
        width: 100% !important
      }
    }
  </style>
  <template>
    
    <div class="flex-row" ref='ier' :style='{float: f?"left":"", width: width + "%"}'>
      <div class="flex-t" ref='iet' :style="{flex: w + 'px 0 0'}"><i style="color:#F44336;text-shadow:0 1px 2px gray"  v-if='need'>*</i> {{name}}：</div>
      <div class="flex-c"  ref='iec'  :style="{paddingTop: t ? '8px': '0'}">
        <slot></slot>
      </div>
    </div>
  </template>
  <script>
    export default {
      props: {
        name: { // 字段
          type: String
        },
        need: {
          type: Boolean
        },
        t: { // k 跟 v 对齐方式
          type: Boolean,
          default: false
        },
        f: {
          type: Boolean,
          default: false
        },
        w: {
          type: String,
          default: '100'
        },
        width: {
          type: String,
          default: '100'
        }
      },
      mounted() {
        if (window.navigator.userAgent.indexOf('MSIE 9.0') !== -1) {
          this.$refs.iet.setAttribute('class', 'ie-t')
          this.$refs.iec.setAttribute('class', 'ie-c')
          this.$refs.ier.setAttribute('class', 'ie-r')
        }
      }
    }
  </script>
  