<template>
  <div class="userManage">
    <div class="box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>其他服务</el-breadcrumb-item>
        <el-breadcrumb-item>修改运费模板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mask"></div>

    <div class="add_template">
      <div class="add_template_title popup_title">修改运费模板</div>
      <el-row>
        <el-col :span="24" style="margin-top: 20px">
          <div class="template_names">
            <div class="template_left">模板名称：</div>
            <el-input v-model="template" style="width:30%;"></el-input>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="template_names">
            <div class="template_left">默认运费：</div>
            <el-input v-model="freight" style="width:30%;"></el-input>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="template_names">
            <div class="template_left">免邮设置：</div>
            <div style="line-height: 36px;">
              <input type="radio" id="jack" value="0" v-model="freeShipping">
              <label for="jack">不包邮</label>
              <input type="radio" id="john" value="1" v-model="freeShipping">
              <label for="john">订单满额免邮</label>
            </div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px" v-show="freeShipping == 1">
          <div class="template_names">
            <div class="template_left">满额免邮：</div>
            <el-input v-show="freeShipping == 1" style="width: 10%" v-model="full"></el-input>
            元
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="template_names">
            <div class="template_left">非默认运费地区运费：</div>
            <el-input style="width: 10%" v-model="fre"></el-input>
            元
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="template_names">
            <div class="template_left">非默认运费地区：</div>
            <div id="addFilg">
              <div v-for="data in datas" style="position: relative;" class="oneList">
                <!--遍历父的-->
                <input type="checkbox" :id="data.listTitle" value="" :checked="isTitleChecked(data)"
                       @change="changeTitleChecked(data,$event)"

                /><span>{{data.listTitle}}</span>
                <div class="child">
                  <div class="er" v-for="item in data.listItem">
                    <!--遍历子的-->
                    <input
                      type="checkbox"
                      :value="item"
                      v-model="data.selected"
                    />
                    {{item.name}}
                  </div>
                </div>
                <i class="la el-icon-caret-right" @click="changeNo($event)"></i>

              </div>
            </div>

            <!--<div id="quanxuan">-->
            <!--<input id="all-checked"-->
            <!--type="checkbox"-->
            <!--:checked="isAllChecked()"-->
            <!--@change="changeAllChecked($event)"-->
            <!--/>-->
            <!--<span>全选</span>-->
            <!--</div>-->
          </div>
        </el-col>
      </el-row>
      <div style="margin-top: 30px">
        <el-button type="primary" @click="adddiqu">修改</el-button>
      </div>
    </div>


  </div>
</template>
<script>

  import http from '../../http'


  export default {
    name: 'userManage',
    data() {
      return {
        sheng: [],
        shi: [],
        freId: '',
        template: '',
        freight: '',
        full: '',
        id: '',
        freeShipping: '',
        dynamicTags: [],
        inputValue: '',
        freights: '',
        fre: '',
        datas: [
          {
            "selected": [],
            "listTitle": "北京市",
            "listItem": [
              {"name": "北京市", "code": "110100"}
            ]
          }, {
            "selected": [],
            "listTitle": "天津市",
            "listItem": [{"name": "天津市", "code": "120100"}]
          }, {
            "selected": [],
            "listTitle": "河北省",
            "listItem": [{"name": "石家庄市", "code": "130100"}, {"name": "唐山市", "code": "130200"}, {
              "name": "秦皇岛市",
              "code": "130300"
            }, {"name": "邯郸市", "code": "130400"}, {"name": "邢台市", "code": "130500"}, {
              "name": "保定市",
              "code": "130600"
            }, {"name": "张家口市", "code": "130700"}, {"name": "承德市", "code": "130800"}, {
              "name": "沧州市",
              "code": "130900"
            }, {"name": "廊坊市", "code": "131000"}, {"name": "衡水市", "code": "131100"}]
          }, {
            "selected": [],
            "listTitle": "山西省",
            "listItem": [{"name": "太原市", "code": "140100"}, {"name": "大同市", "code": "140200"}, {
              "name": "阳泉市",
              "code": "140300"
            }, {"name": "长治市", "code": "140400"}, {"name": "晋城市", "code": "140500"}, {
              "name": "朔州市",
              "code": "140600"
            }, {"name": "晋中市", "code": "140700"}, {"name": "运城市", "code": "140800"}, {
              "name": "忻州市",
              "code": "140900"
            }, {"name": "临汾市", "code": "141000"}, {"name": "吕梁市", "code": "141100"}]
          }, {
            "selected": [],
            "listTitle": "内蒙古自治区",
            "listItem": [{"name": "呼和浩特市", "code": "150100"}, {"name": "包头市", "code": "150200"}, {
              "name": "乌海市",
              "code": "150300"
            }, {"name": "赤峰市", "code": "150400"}, {"name": "通辽市", "code": "150500"}, {
              "name": "鄂尔多斯市",
              "code": "150600"
            }, {"name": "呼伦贝尔市", "code": "150700"}, {"name": "巴彦淖尔市", "code": "150800"}, {
              "name": "乌兰察布市",
              "code": "150900"
            }, {"name": "兴安盟", "code": "152200"}, {"name": "锡林郭勒盟", "code": "152500"}, {
              "name": "阿拉善盟",
              "code": "152900"
            }]
          }, {
            "selected": [],
            "listTitle": "辽宁省",
            "listItem": [{"name": "沈阳市", "code": "210100"}, {"name": "大连市", "code": "210200"}, {
              "name": "鞍山市",
              "code": "210300"
            }, {"name": "抚顺市", "code": "210400"}, {"name": "本溪市", "code": "210500"}, {
              "name": "丹东市",
              "code": "210600"
            }, {"name": "锦州市", "code": "210700"}, {"name": "营口市", "code": "210800"}, {
              "name": "阜新市",
              "code": "210900"
            }, {"name": "辽阳市", "code": "211000"}, {"name": "盘锦市", "code": "211100"}, {
              "name": "铁岭市",
              "code": "211200"
            }, {"name": "朝阳市", "code": "211300"}, {"name": "葫芦岛市", "code": "211400"}]
          }, {
            "selected": [],
            "listTitle": "吉林省",
            "listItem": [{"name": "长春市", "code": "220100"}, {"name": "吉林市", "code": "220200"}, {
              "name": "四平市",
              "code": "220300"
            }, {"name": "辽源市", "code": "220400"}, {"name": "通化市", "code": "220500"}, {
              "name": "白山市",
              "code": "220600"
            }, {"name": "松原市", "code": "220700"}, {"name": "白城市", "code": "220800"}, {
              "name": "延边朝鲜族自治州",
              "code": "222400"
            }]
          }, {
            "selected": [],
            "listTitle": "黑龙江省",
            "listItem": [{"name": "哈尔滨市", "code": "230100"}, {"name": "齐齐哈尔市", "code": "230200"}, {
              "name": "鸡西市",
              "code": "230300"
            }, {"name": "鹤岗市", "code": "230400"}, {"name": "双鸭山市", "code": "230500"}, {
              "name": "大庆市",
              "code": "230600"
            }, {"name": "伊春市", "code": "230700"}, {"name": "佳木斯市", "code": "230800"}, {
              "name": "七台河市",
              "code": "230900"
            }, {"name": "牡丹江市", "code": "231000"}, {"name": "黑河市", "code": "231100"}, {
              "name": "绥化市",
              "code": "231200"
            }, {"name": "大兴安岭地区", "code": "232700"}]
          }, {"selected": [], "listTitle": "上海市", "listItem": [{"name": "上海市", "code": "310100"}]}, {
            "selected": [],
            "listTitle": "江苏省",
            "listItem": [{"name": "南京市", "code": "320100"}, {"name": "无锡市", "code": "320200"}, {
              "name": "徐州市",
              "code": "320300"
            }, {"name": "常州市", "code": "320400"}, {"name": "苏州市", "code": "320500"}, {
              "name": "南通市",
              "code": "320600"
            }, {"name": "连云港市", "code": "320700"}, {"name": "淮安市", "code": "320800"}, {
              "name": "盐城市",
              "code": "320900"
            }, {"name": "扬州市", "code": "321000"}, {"name": "镇江市", "code": "321100"}, {
              "name": "泰州市",
              "code": "321200"
            }, {"name": "宿迁市", "code": "321300"}]
          }, {
            "selected": [],
            "listTitle": "浙江省",
            "listItem": [{"name": "杭州市", "code": "330100"}, {"name": "宁波市", "code": "330200"}, {
              "name": "温州市",
              "code": "330300"
            }, {"name": "嘉兴市", "code": "330400"}, {"name": "湖州市", "code": "330500"}, {
              "name": "绍兴市",
              "code": "330600"
            }, {"name": "金华市", "code": "330700"}, {"name": "衢州市", "code": "330800"}, {
              "name": "舟山市",
              "code": "330900"
            }, {"name": "台州市", "code": "331000"}, {"name": "丽水市", "code": "331100"}]
          }, {
            "selected": [],
            "listTitle": "安徽省",
            "listItem": [{"name": "合肥市", "code": "340100"}, {"name": "芜湖市", "code": "340200"}, {
              "name": "蚌埠市",
              "code": "340300"
            }, {"name": "淮南市", "code": "340400"}, {"name": "马鞍山市", "code": "340500"}, {
              "name": "淮北市",
              "code": "340600"
            }, {"name": "铜陵市", "code": "340700"}, {"name": "安庆市", "code": "340800"}, {
              "name": "黄山市",
              "code": "341000"
            }, {"name": "滁州市", "code": "341100"}, {"name": "阜阳市", "code": "341200"}, {
              "name": "宿州市",
              "code": "341300"
            }, {"name": "六安市", "code": "341500"}, {"name": "亳州市", "code": "341600"}, {
              "name": "池州市",
              "code": "341700"
            }, {"name": "宣城市", "code": "341800"}]
          }, {
            "selected": [],
            "listTitle": "福建省",
            "listItem": [{"name": "福州市", "code": "350100"}, {"name": "厦门市", "code": "350200"}, {
              "name": "莆田市",
              "code": "350300"
            }, {"name": "三明市", "code": "350400"}, {"name": "泉州市", "code": "350500"}, {
              "name": "漳州市",
              "code": "350600"
            }, {"name": "南平市", "code": "350700"}, {"name": "龙岩市", "code": "350800"}, {"name": "宁德市", "code": "350900"}]
          }, {
            "selected": [],
            "listTitle": "江西省",
            "listItem": [{"name": "南昌市", "code": "360100"}, {"name": "景德镇市", "code": "360200"}, {
              "name": "萍乡市",
              "code": "360300"
            }, {"name": "九江市", "code": "360400"}, {"name": "新余市", "code": "360500"}, {
              "name": "鹰潭市",
              "code": "360600"
            }, {"name": "赣州市", "code": "360700"}, {"name": "吉安市", "code": "360800"}, {
              "name": "宜春市",
              "code": "360900"
            }, {"name": "抚州市", "code": "361000"}, {"name": "上饶市", "code": "361100"}]
          }, {
            "selected": [],
            "listTitle": "山东省",
            "listItem": [{"name": "济南市", "code": "370100"}, {"name": "青岛市", "code": "370200"}, {
              "name": "淄博市",
              "code": "370300"
            }, {"name": "枣庄市", "code": "370400"}, {"name": "东营市", "code": "370500"}, {
              "name": "烟台市",
              "code": "370600"
            }, {"name": "潍坊市", "code": "370700"}, {"name": "济宁市", "code": "370800"}, {
              "name": "泰安市",
              "code": "370900"
            }, {"name": "威海市", "code": "371000"}, {"name": "日照市", "code": "371100"}, {
              "name": "莱芜市",
              "code": "371200"
            }, {"name": "临沂市", "code": "371300"}, {"name": "德州市", "code": "371400"}, {
              "name": "聊城市",
              "code": "371500"
            }, {"name": "滨州市", "code": "371600"}, {"name": "菏泽市", "code": "371700"}]
          }, {
            "selected": [],
            "listTitle": "河南省",
            "listItem": [{"name": "郑州市", "code": "410100"}, {"name": "开封市", "code": "410200"}, {
              "name": "洛阳市",
              "code": "410300"
            }, {"name": "平顶山市", "code": "410400"}, {"name": "安阳市", "code": "410500"}, {
              "name": "鹤壁市",
              "code": "410600"
            }, {"name": "新乡市", "code": "410700"}, {"name": "焦作市", "code": "410800"}, {
              "name": "濮阳市",
              "code": "410900"
            }, {"name": "许昌市", "code": "411000"}, {"name": "漯河市", "code": "411100"}, {
              "name": "三门峡市",
              "code": "411200"
            }, {"name": "南阳市", "code": "411300"}, {"name": "商丘市", "code": "411400"}, {
              "name": "信阳市",
              "code": "411500"
            }, {"name": "周口市", "code": "411600"}, {"name": "驻马店市", "code": "411700"}]
          }, {
            "selected": [],
            "listTitle": "湖北省",
            "listItem": [{"name": "武汉市", "code": "420100"}, {"name": "黄石市", "code": "420200"}, {
              "name": "十堰市",
              "code": "420300"
            }, {"name": "宜昌市", "code": "420500"}, {"name": "襄樊市", "code": "420600"}, {
              "name": "鄂州市",
              "code": "420700"
            }, {"name": "荆门市", "code": "420800"}, {"name": "孝感市", "code": "420900"}, {
              "name": "荆州市",
              "code": "421000"
            }, {"name": "黄冈市", "code": "421100"}, {"name": "咸宁市", "code": "421200"}, {
              "name": "随州市",
              "code": "421300"
            }, {"name": "恩施土家族苗族自治州", "code": "422800"}]
          }, {
            "selected": [],
            "listTitle": "湖南省",
            "listItem": [{"name": "长沙市", "code": "430100"}, {"name": "株洲市", "code": "430200"}, {
              "name": "湘潭市",
              "code": "430300"
            }, {"name": "衡阳市", "code": "430400"}, {"name": "邵阳市", "code": "430500"}, {
              "name": "岳阳市",
              "code": "430600"
            }, {"name": "常德市", "code": "430700"}, {"name": "张家界市", "code": "430800"}, {
              "name": "益阳市",
              "code": "430900"
            }, {"name": "郴州市", "code": "431000"}, {"name": "永州市", "code": "431100"}, {
              "name": "怀化市",
              "code": "431200"
            }, {"name": "娄底市", "code": "431300"}, {"name": "湘西土家族苗族自治州", "code": "433100"}]
          }, {
            "selected": [],
            "listTitle": "广东省",
            "listItem": [{"name": "广州市", "code": "440100"}, {"name": "韶关市", "code": "440200"}, {
              "name": "深圳市",
              "code": "440300"
            }, {"name": "珠海市", "code": "440400"}, {"name": "汕头市", "code": "440500"}, {
              "name": "佛山市",
              "code": "440600"
            }, {"name": "江门市", "code": "440700"}, {"name": "湛江市", "code": "440800"}, {
              "name": "茂名市",
              "code": "440900"
            }, {"name": "肇庆市", "code": "441200"}, {"name": "惠州市", "code": "441300"}, {
              "name": "梅州市",
              "code": "441400"
            }, {"name": "汕尾市", "code": "441500"}, {"name": "河源市", "code": "441600"}, {
              "name": "阳江市",
              "code": "441700"
            }, {"name": "清远市", "code": "441800"}, {"name": "东莞市", "code": "441900"}, {
              "name": "中山市",
              "code": "442000"
            }, {"name": "潮州市", "code": "445100"}, {"name": "揭阳市", "code": "445200"}, {"name": "云浮市", "code": "445300"}]
          }, {
            "selected": [],
            "listTitle": "广西壮族自治区",
            "listItem": [{"name": "南宁市", "code": "450100"}, {"name": "柳州市", "code": "450200"}, {
              "name": "桂林市",
              "code": "450300"
            }, {"name": "梧州市", "code": "450400"}, {"name": "北海市", "code": "450500"}, {
              "name": "防城港市",
              "code": "450600"
            }, {"name": "钦州市", "code": "450700"}, {"name": "贵港市", "code": "450800"}, {
              "name": "玉林市",
              "code": "450900"
            }, {"name": "百色市", "code": "451000"}, {"name": "贺州市", "code": "451100"}, {
              "name": "河池市",
              "code": "451200"
            }, {"name": "来宾市", "code": "451300"}, {"name": "崇左市", "code": "451400"}]
          }, {
            "selected": [],
            "listTitle": "海南省",
            "listItem": [{"name": "海口市", "code": "460100"}, {"name": "三亚市", "code": "460200"}]
          }, {"selected": [], "listTitle": "重庆市", "listItem": [{"name": "重庆市", "code": "500100"}]}, {
            "selected": [],
            "listTitle": "四川省",
            "listItem": [{"name": "成都市", "code": "510100"}, {"name": "自贡市", "code": "510300"}, {
              "name": "攀枝花市",
              "code": "510400"
            }, {"name": "泸州市", "code": "510500"}, {"name": "德阳市", "code": "510600"}, {
              "name": "绵阳市",
              "code": "510700"
            }, {"name": "广元市", "code": "510800"}, {"name": "遂宁市", "code": "510900"}, {
              "name": "内江市",
              "code": "511000"
            }, {"name": "乐山市", "code": "511100"}, {"name": "南充市", "code": "511300"}, {
              "name": "眉山市",
              "code": "511400"
            }, {"name": "宜宾市", "code": "511500"}, {"name": "广安市", "code": "511600"}, {
              "name": "达州市",
              "code": "511700"
            }, {"name": "雅安市", "code": "511800"}, {"name": "巴中市", "code": "511900"}, {
              "name": "资阳市",
              "code": "512000"
            }, {"name": "阿坝藏族羌族自治州", "code": "513200"}, {"name": "甘孜藏族自治州", "code": "513300"}, {
              "name": "凉山彝族自治州",
              "code": "513400"
            }]
          }, {
            "selected": [],
            "listTitle": "贵州省",
            "listItem": [{"name": "贵阳市", "code": "520100"}, {"name": "六盘水市", "code": "520200"}, {
              "name": "遵义市",
              "code": "520300"
            }, {"name": "安顺市", "code": "520400"}, {"name": "毕节市", "code": "520500"}, {
              "name": "黔西南布依族苗族自治州",
              "code": "522300"
            }, {"name": "黔东南苗族侗族自治州", "code": "522600"}, {"name": "黔南布依族苗族自治州", "code": "522700"}]
          }, {
            "selected": [],
            "listTitle": "云南省",
            "listItem": [{"name": "昆明市", "code": "530100"}, {"name": "曲靖市", "code": "530300"}, {
              "name": "玉溪市",
              "code": "530400"
            }, {"name": "保山市", "code": "530500"}, {"name": "昭通市", "code": "530600"}, {
              "name": "丽江市",
              "code": "530700"
            }, {"name": "普洱市", "code": "530800"}, {"name": "临沧市", "code": "530900"}, {
              "name": "楚雄彝族自治州",
              "code": "532300"
            }, {"name": "红河哈尼族彝族自治州", "code": "532500"}, {"name": "文山壮族苗族自治州", "code": "532600"}, {
              "name": "西双版纳傣族自治州",
              "code": "532800"
            }, {"name": "大理白族自治州", "code": "532900"}, {"name": "德宏傣族景颇族自治州", "code": "533100"}, {
              "name": "怒江傈僳族自治州",
              "code": "533300"
            }, {"name": "迪庆藏族自治州", "code": "533400"}]
          }, {
            "selected": [],
            "listTitle": "西藏自治区",
            "listItem": [{"name": "拉萨市", "code": "540100"}, {"name": "昌都地区", "code": "542100"}, {
              "name": "山南地区",
              "code": "542200"
            }, {"name": "日喀则地区", "code": "542300"}, {"name": "那曲地区", "code": "542400"}, {
              "name": "阿里地区",
              "code": "542500"
            }, {"name": "林芝地区", "code": "542600"}]
          }, {
            "selected": [],
            "listTitle": "陕西省",
            "listItem": [{"name": "西安市", "code": "610100"}, {"name": "铜川市", "code": "610200"}, {
              "name": "宝鸡市",
              "code": "610300"
            }, {"name": "咸阳市", "code": "610400"}, {"name": "渭南市", "code": "610500"}, {
              "name": "延安市",
              "code": "610600"
            }, {"name": "汉中市", "code": "610700"}, {"name": "榆林市", "code": "610800"}, {
              "name": "安康市",
              "code": "610900"
            }, {"name": "商洛市", "code": "611000"}]
          }, {
            "selected": [],
            "listTitle": "甘肃省",
            "listItem": [{"name": "兰州市", "code": "620100"}, {"name": "嘉峪关市", "code": "620200"}, {
              "name": "金昌市",
              "code": "620300"
            }, {"name": "白银市", "code": "620400"}, {"name": "天水市", "code": "620500"}, {
              "name": "武威市",
              "code": "620600"
            }, {"name": "张掖市", "code": "620700"}, {"name": "平凉市", "code": "620800"}, {
              "name": "酒泉市",
              "code": "620900"
            }, {"name": "庆阳市", "code": "621000"}, {"name": "定西市", "code": "621100"}, {
              "name": "陇南市",
              "code": "621200"
            }, {"name": "临夏回族自治州", "code": "622900"}, {"name": "甘南藏族自治州", "code": "623000"}]
          }, {
            "selected": [],
            "listTitle": "青海省",
            "listItem": [{"name": "西宁市", "code": "630100"}, {"name": "海东地区", "code": "632100"}, {
              "name": "海北藏族自治州",
              "code": "632200"
            }, {"name": "黄南藏族自治州", "code": "632300"}, {"name": "海南藏族自治州", "code": "632500"}, {
              "name": "果洛藏族自治州",
              "code": "632600"
            }, {"name": "玉树藏族自治州", "code": "632700"}, {"name": "海西蒙古族藏族自治州", "code": "632800"}]
          }, {
            "selected": [],
            "listTitle": "宁夏回族自治区",
            "listItem": [{"name": "银川市", "code": "640100"}, {"name": "石嘴山市", "code": "640200"}, {
              "name": "吴忠市",
              "code": "640300"
            }, {"name": "固原市", "code": "640400"}, {"name": "中卫市", "code": "640500"}]
          }, {
            "selected": [],
            "listTitle": "新疆维吾尔自治区",
            "listItem": [{"name": "乌鲁木齐市", "code": "650100"}, {"name": "克拉玛依市", "code": "650200"}, {
              "name": "吐鲁番地区",
              "code": "652100"
            }, {"name": "哈密地区", "code": "652200"}, {"name": "昌吉回族自治州", "code": "652300"}, {
              "name": "博尔塔拉蒙古自治州",
              "code": "652700"
            }, {"name": "巴音郭楞蒙古自治州", "code": "652800"}, {"name": "阿克苏地区", "code": "652900"}, {
              "name": "克孜勒苏柯尔克孜自治州",
              "code": "653000"
            }, {"name": "喀什地区", "code": "653100"}, {"name": "和田地区", "code": "653200"}, {
              "name": "伊犁哈萨克自治州",
              "code": "654000"
            }, {"name": "塔城地区", "code": "654200"}, {"name": "阿勒泰地区", "code": "654300"}]
          }]
      }
    }
    ,
    created() {
      this.freId = this.$route.params.id;
      this.getList()
    }
    ,
    methods: {
      getarr() {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].item_code.substr(2, 4) == '0000') {
            this.sheng.push(this.list[i])
            this.datas.push({
              selected: [],
              listTitle: this.list[i].item_name,
              listItem: []
            })
          } else {
            this.shi.push(this.list[i])
          }
        }
        for (let i = 0; i < this.sheng.length; i++) {
          let listItem = []
          for (let q = 0; q < this.shi.length; q++) {
            if (this.sheng[i].item_code.substr(0, 2) == this.shi[q].item_code.substr(0, 2) && this.shi[q].item_code.substr(4, 2) == '00') {
              listItem.push({
                name: this.shi[q].item_name,
                code: this.shi[q].item_code
              })
            }
          }
          this.datas[i].listItem = listItem
        }
      }
      ,
      isTitleChecked: function (data) {
        var _selected = data.selected;
        var _listItem = data.listItem;
// 验证selected中是否含有全部的item的id 如果是 证明title要选中
        return _listItem.every(function (item) {
          return _selected.indexOf(item) != -1;
        });
      }
      ,
      changeTitleChecked: function (data, event) {
        if (event.target.checked === true) {
          data.listItem.forEach(function (item) {
            data.selected.indexOf(item) === -1 && data.selected.push(item);
          })
        } else {
          data.selected = [];
        }
      }
      ,
      isAllChecked: function () {
        return this.datas.every(function (data) {
          return data.selected.length === data.listItem.length;
        });
      }
      ,
      changeAllChecked: function (event) {
        if (event.target.checked === true) {
          this.datas.forEach(function (data) {
            data.listItem.forEach(function (item) {
              data.selected.indexOf(item) === -1 && data.selected.push(item);
            })
          })
        } else {
          this.datas.forEach(function (data) {
            data.selected = [];
          })
        }
      }
      ,

      changeNo(event){
        $(event.target).prev().toggle();
        if ($(event.target).prev().css('display') == 'block') {
          $(event.target).addClass('el-icon-caret-bottom')
          $(event.target).removeClass('el-icon-caret-right')
        } else {
          $(event.target).removeClass('el-icon-caret-bottom')
          $(event.target).addClass('el-icon-caret-right')
        }
      },
      adddiqu() {
        let arr = []
        for (let i = 0; i < this.datas.length; i++) {
          for (let q = 0; q < this.datas[i].selected.length; q++) {
            if (this.datas[i].selected != '') {
              arr.push(this.datas[i].selected[q].name)
            }
          }
        }

        if (this.template == '') {
          this.$message({
            type: 'info',
            message: '请填写运费模版'
          });
        } else {
          let url = http.apiMap.updataFreight;
          let data = {
            common: 1,
            id: this.freId,
            template: this.template,
            freight: this.freight * 100,
            full: this.full * 100,
            freeShipping: this.freeShipping,
            freightNodefaults: JSON.stringify([{
              region: arr.join(','),
              freight: this.fre * 100,
            }])
          };
          this.$http.post(url, data).then(
            function (res) {
              if (res.body.result) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.$router.push('/BillDemo');

              } else {
                this.$message({
                  type: 'error',
                  message: res.body.msg
                });
              }

            }
          );
        }

      }
      ,

      getList() {
        let url = http.apiMap.findFreight;
        let data = {
          id: this.freId,
          common: 1
        };
        this.$http.post(url, data).then(
          function (res) {
            if (res.body.result) {
              let data = res.body.data.ft;
              this.template = data.template;
              this.freight = data.freight / 100;
              this.freeShipping = data.freeShipping;
              this.full = data.full / 100;
              this.fre = data.noDefaultFreight / 100;
              let region = data.region.split(',');
              for (let i = 0; i < this.datas.length; i++) {
                for (let q = 0; q < this.datas[i].listItem.length; q++) {
                  for (let z = 0; z < region.length; z++) {
                    if (this.datas[i].listItem[q].name == region[z]) {
                      this.datas[i].selected.push(this.datas[i].listItem[q])
                    }
                  }
                }

                if (this.datas[i].selected != '') {
                  for (let a = 0; a < $(".oneList").length; a++) {
                    if ($(".oneList span").eq(a).text().replace(/\s+/g, '') == this.datas[i].listTitle) {
                      $(".oneList").eq(i).find('.child').css('display','block');
                      $(".oneList").eq(i).find('.child').next().addClass('el-icon-caret-bottom')
                      $(".oneList").eq(i).find('.child').next().removeClass('el-icon-caret-right')
                    }
                  }
                }

              }

            }
          }
        );
      },

    }
    ,

  }

</script>

<style scoped="scoped" lang="scss">
  #orderState {
    height: 36px;
    float: left;
    margin-left: 20px;
  }

  .box {
    min-height: 100px;
  }

  .template_names {
    width: 100%;
    .template_left {
      float: left;
      margin-right: 20px;
      line-height: 36px;
    }
    .template_right {
      float: left;
    }
  }

  .child {
    display: none;
  }

  .la {

    display: block;
    position: absolute;
    left: -15px;
    top: 3px;
  }

  #addFilg {
    width: 100%;
    clear: both;
    margin-left: 88px;
    .er {
      margin-left: 20px;
    }
  }
</style>
