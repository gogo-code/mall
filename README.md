# 乐享商城项目说明

##### [项目源码](<https://github.com/gogo-code/mall>)

##### [项目演示](https://blog.csdn.net/weixin_44065037/article/details/108739846)

## 技术栈：

- vue

- vue-router

- vuex

- axios

- element-ui

- scss

- vue-cookie

- vue-lazyload

- vue-awesome-swiper

- vue-infinite-scroll

- qrcode

  

## 项目运行

````
npm install     		//安装模块

npm run serve			//启动项目

npm run build			//打包项目

测试账号：admin		测试密码：admin
````

<br>

## 项目功能

商城首页、登录注册页、商城产品页、商品详情、购物车、订单确认、订单支付、订单列表

<br>

## 模块划分以及设计思路

### 首页模块

1. 抽离顶部条组件，底部组件，服务组件，写好静态样式，再写主体样式，主体数据对接，轮播图使用swiper插件

2. 在顶部组件中初始化数据，调用产品的分类id的接口，保存前六条商品数据，渲染数据

3. 添加点击跳转事件，比如登录，购物车，商品

4. 调用产品的分类id的接口，保存八条商品数据，渲染数据

5. 添加模态框组件，再添加点击购物车事件，调用购物车添加接口，将获取的购物车数据保存到vuex，另外显示弹框

6. 安装vue-lazyload实现图片的懒加载

7. 完成退出功能：调用退出接口，清空cookie、用户名、购物车数量


<br>

### 登录与注册模块

1. 写好静态样式

2. 初始化数据，双向绑定数据，添加点击事件，注册调用注册接口，登录调用登录接口，需要注意登录成功需要保存userid到cookie，以及保存用户名到vuex中，登录成功跳转到首页

3. 根据islogin使用vif实现切换登录注册

<br>

### 产品详情模块

1. 写好产品页面静态样式。这里抽离产品参数组件，可以和后面的详情页面复用

2. 初始化数据，根据从首页传来的id来请求接口，保存数据，渲染数据

3. 添加点击购买事件，根据从首页传来的id来请求接口跳转到相应的商品详情

4. 写好详情页面静态样式

5. 初始化数据，根据从产品页传来的id来请求接口，保存数据，渲染数据

6. 添加加入购物车点击事件，传递两个参数产品id以及选中状态来调用接口，同时保存购物车数量到vuex中同步更新头部组件，另外如果没有登录会捕获错误

<br>

### 购物车模块

1. 写好静态样式，注意这里的购物车列表使用了flex布局，用flex：1,2,3来比例分配子元素的宽度大小

2. 请求接口保存数据，注意在已选择件数中做一层过滤

3. 渲染页面，vfor循环列表，von监听点击事件，vbind绑定选中状态样式，用类名对象来是否显示

4. von实现全选、非全选，全选和非全选是根据数据中的全选来判断调用哪个接口，调用接口需要重新保存数据，这时可以封装一个函数专门保存数据提高效率

5. 更新购物车数量，写一个函数专门对购物车数量做增加和删除和单选，需要传递两个参数，一个是单个商品的信息，一个是操作类型，函数内部对操作类型进行判断，需要注意的是商品数量的极限值，不能小于1，也不能大于商品库存，最后请求接口（传参包括商品id，数量以及选中状态）重新保存渲染数据

6. 删除商品（传参item），请求接口重新保存渲染数据
7. 购物车下单，注意如果所有商品都没选中就不能跳转到订单确认

<br>

### 订单确认模块

1. 写好静态样式，其中注意两个input并列直接使用display：inline-block，不需要浮动或flex，还用了一个相邻选择器+调整间距

2. 初始化数据，请求购物车以及订单地址接口，保存数据，渲染数据

3. 地址删除，编辑，添加功能为了方便接口调用统一用userAction来指挥，用一个函数来操控弹框再设置各自的函数，弹框函数最基础的是要把操作类型，弹出框是否显示以及选中项保存，在弹框后点击触发submit事件各自做一些接口请求及其他，接口请求需要做的事有关闭弹框，更新地址信息，提示信息

4. 订单提交，也是要注意订单的收货地址，在点击收货地址时需要使用类名对象来选中一个商品，如果没选择则提示，选中后根据收货地址跳转到相应页面



<br>

### 订单支付模块

1. 写好静态样式

2. 初始化数据，根据订单号请求接口拉取数据，保存地址信息用到了字符串模板的拼接整合为一个字段，以及保存商品信息，渲染数据

3. 设置点击订单详情显示隐藏效果，监听点击事件将数据showDetail取反，同时动态绑定类名，对象类名取值为showDetail

4. 点击支付宝支付，更新状态，并在新窗口打开到Alipay用window.open,根据地址栏的订单编号请求接口返回一段html片段，渲染到页面（使用vhtml），有一段sciprt提交脚本不能运行，可以自己使用dom操作提交触发，而提交需要一段时间，为了体验可以在这段时间添加一个loading动画，用vif控制，另外由于渲染html需要等待一段时间，可以用个定时器等片段渲染完，然后直接用document.forms[0].submit提交，重定向到支付包页面来进行支付

5. 实现微信支付功能，调用接口拿到字符串，使用qrcode插件把字符串转换为转换为base64字符串图片，然后把图片保存下来传给子组件进行渲染，扫码过程中需要实时轮询当子组件点击关闭后触发关闭弹框同时父组件把弹框弹出来，用户可以查看订单列表或者返回当前页

6. 微信支付状态轮询，当用户扫描二维码支付成功后直接跳转到订单列表，用定时器来轮询状态，当支付成功即状态码为20时就清空定时器并跳转，另外关闭微信弹框也会关闭定时器，不然会一直定时


<br>

### 订单列表模块

1. 写好静态样式

2. 初始化数据，请求接口，保存数据，vfor二层渲染数据，在每一个订单上添加支付和未支付，在未支付中添加点击事件，跳转到订单支付页面

3. 用户体验优化，在数据获取前添加loading动画，在无数据时添加无数据的页面显示，条件是loading完成后，数据的长度为0

4. 订单列表分页

   三种实现方式

   第一种：分页器
   
   引入elementui插件，绑定订单总量以及单页大小，点击页号将页号传给数据重新请求接口

   第二种：加载更多

   引入elementui插件,点击加载更多，页号增加并将页号传给数据重新请求接口，需要注意的是每次请求接口数据都需要合并数组，并且需要保存数据中的hasNextPage，根据这个字段来最后隐藏按钮
   
   第三种：滚动加载

   引入vue-infinite-scroll插件，加入一个div 设置无限滚动方法，离底部的距离极限，还有不能显示的判断，跟二类似。不过这里需要有个定时器来实现一个停留效果



<br>


## 新增内容

#### 回顶部组件
实现过程

<br>
省市三级联动(有小bug)

<br>

## 项目优化

1. 用户体验优化

   通过Loading、NoData、BackTop等组件

2. 性能优化

   通过路由懒加载、图片懒加载、删除预加载、图片压缩等方式

3. 代码优化

   通过scss中的mixin对样式实现可复用

   通过抽离组件提升代码的复用性

   对许多有公共代码的方法进行提取减少了代码的冗余


<br>

## 项目遇到的bug

**1. swiper不显示轮播**

   这个比较坑，我是直接安装的vue-awesome-swiper，然后一顿操作后出错，看github官网看还要安装一个swiper插件，但是还是报错，网上查找相关资料，直接都卸载了换了低版本的重新安装才可以

**2. 修改elementUI的默认样式不成功**

​    经过上网搜寻资料发现是我的vue模板默认是添加scope，这是不能修改样式的原因，解决办法有两种：一种将自己的文件里的scope去掉即可，但是这样有全局污染的风险，需要在根元素上套用一个类名；另一种是使用深度选择器>>>,在预处理器中不识别要用/deep/替换

**3. 从订单支付跳转到订单列表，头部组件没有改变样式，刷新后却可以改变**

   原因是之前使用的是在父组件中定义的动态实现方法，在父组件定义的头部组件在mounted判断中只会渲染一  次，跳转只是子路由里的子组件在刷新,

 解决办法：将头部组件放入子组件中分别配置，

**4. 加入购物车未支付跳转到首页发现购物车有数量但是点开后没有，全部跳转到订单列表里了**

   解决办法:  在订单确认页面点击去结算需要将购物车数量状态置空保存到vuex中

**5. 模态框的进入动画效果有，但是离开时没有动画效果**

   这个使用的是vue自带的动画样式，经过仔细查看官网说明，发现对相应的样式效果是有顺序要求的，slide-leave-active必须在slide-enter之前

 **6. 页面刷新后vuex保存的数据比如用户名购物车数量会消失**

   原因是store里的数据是保存在运行内存中的,当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值初始化,解决办法是在app.vue中调用接口获取值保存到vuex中，调用前提是有相应的cookie，根据cookie来调用接口，如果不这么做，直接初始化方法就会连续调用两次sum接口，造成资源请求的浪费  

<br>
上面的bug是我在项目中遇到的较大bug，下面是我的一点思考:

<br>


**1. 为什么从vuex中读取的值需要在computed中获取，而不是在data中获取**

   原因是请求接口保存到vuex中的数据是有延迟的，读取在保存之前就会是空，所以
   需要用computed属性来缓存数据，当数据发生变化时重新调用方法。




<br>

## 项目中运用的数组位置和方法

**index.vue 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   		slice()截取商品数组，不改变原数组**

**cart.vue 	   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  	 	filter()过滤选中商品**

**cart.vue 	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 		every()购物车下单根据商品数组没有一个选中返回Boolean**

**orderConfirm.vue 	&nbsp;&nbsp;&nbsp;&nbsp;	map()遍历商品数组将单个商品数量相加**

**orderList.vue 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	concat()加载更多将商品数组进行连接**

<br>

## 项目中使用到的CSS3新特性
transition:图标，商品放上去等过渡效果

box-shadow:导航栏、商品鼠标放上去，参数组件固定后的效果

transform:模态框关闭的放大效果，订单详情的旋转，实现居中，商品鼠标放上存在位移

last-child:清除末尾元素的样式，比如按钮组合，导航栏的伪元素，首页商品分类末尾的底部外边距，订单列表的末尾底部外边距

<br>

## 项目中使用到的es6知识
模块化

promise

模板字符串

解构赋值

let const

展开运算符

箭头函数

加强版对象字面量

代理

<br>

## 项目中使用到的一些很重要的样式




<br>

## 有待优化

商品搜索

注册预校验

代码进一步优化

性能提升

自己实现后端接口

等等

<br>

## 本人文笔很差，之后如果觉得可以做得更好，会不定时更新...







