
const { createApp, createComponent, ref, reactive, h, onMounted, onUpdated, onUnmounted, effect } = Vue

// 计数器组件
const Counter = createComponent({
  props: {
    initCount: {
      type: Number,
      default: 0
    }
  },

  template: `
       <h2>{{title}}</h2>
       <button @click='handleswitch'>点我</button>
       <h3>{{state.count}}</h3>
       <h3>{{state.initcount}}</h3>
       <button @click="handleproxyobj">点我proxy</button>
    `,
  setup (props) {
    const title = ref('响应式-ref创建')
    const state = reactive({ count: 0, initcount: 0 })
    const handleswitch = () => {
      title.value = '切换响应式-ref创建'
      state.count = 99
      state.initcount = props.initCount
    },
      handleproxyobj = () => {
        let obj = {
          a: 1,
          b: 9
        }
        let proxyObj = new Proxy(obj, {
          get: function (target, prop) {
            return prop in target ? target[prop] : 0
          },
          set: function (target, prop, value) {
            console.log(prop)
            if(prop==='a'){
              target[prop] = 888;
            }else if(prop==='b'){
              target[prop] = 999;
            }
           
          }
        })

        console.log(proxyObj.a);        // 1
        console.log(proxyObj.b);        // 0

        proxyObj.a = 666;
        proxyObj.b=10
        console.log(proxyObj.a)         // 888
        console.log(  proxyObj.b)    
      }
    return { title, handleswitch, handleproxyobj, state }

  },
  // render(){
  //   return[
  //     h('div',[
  //       h('p','恭喜你学会了render函数'),
  //       h('p',this.title),

  //     ])
  //   ]
  // }
})
const greeting = ref('Hello vue 3.0')
// 根组件
const App = createComponent({
  components: { Counter },
  //   mounted() {
  //     console.log('>>>>>> mounted 1')
  // },
  template: `
        <div class="container">
            <Counter initCount="11" />
            <span>{{greeting}} 我们相遇的那天</span>
        </div>
    `,

  setup () {

    onMounted(() => {
      console.log('>>>>>> mounted 2')
    })
    // 响应式编码
    effect(() => {
      console.log(greeting.value)
    })
    greeting.value = '是我们的开始'
    return { greeting }
  }
})

// 启动
const container = document.querySelector('#app')
const app = createApp()

app.mount(App, container)