import axios from 'axios';
import qs from 'qs';
import Vue from 'vue'
import store from '../store/index'

let baseUrl = '/api';
Vue.prototype.$imgUrl = 'http://localhost:3000'
//请求拦截
axios.interceptors.request.use(req => {
    if(req.url!=baseUrl+'/api/login'){
        req.headers.authorization = store.state.info.token;
    }
    
    return req
})
//响应拦截
axios.interceptors.response.use(res => {
    console.group('~~~~~~~~~本次请求的路径是:' + res.config.url);
    console.log(res);
    console.groupEnd('请求结束');
    return res
})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~menu请求
//add请求
export const addReq = (form) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: form
    })
}
//list 请求
export const listReq = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }
    })
}
//删除请求
export const delList = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: {
            id: id
        }
    })
}
//请求获取一条要修改的数据
export const reqOne = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//修改接口  
export const reqUpdateDate = (form) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(form)
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~角色管理部分请求~~~~~~~~~~~~~~~~~~~
//角色添加
export const reqroleAdd = (form) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: 'post',
        data: form
    })
}
//角色列表
export const reqroleList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get'
    })
}
//获取一条角色数据
export const reqroleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: 'get',
        params: {
            id: id
        }
    })
}
//角色修改
export const reqroleUpdate = (data) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: 'post',
        data: data
    })
}
//删除角色  删除指定的角色 
export const reqroleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: 'post',
        data: {
            id: id
        }
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~管理员管理接口
//添加管理员
export const reqmangerAdd = (form) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: form
    })
}
//管理员总数  计算分页
export const mangerSum = () => {
    return axios({
        url: baseUrl + '/api/usercount',
        method: 'get'
    })
}
//管理员列表
export const mangerList = (size, page) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params: {
            size: size,
            page: page
        }
    })
}
//获取一条管理员信息
export const mangerDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: 'get',
        params: {
            uid: uid
        }
    })
}
//修改管理员信息
export const manger = (form) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: form
    })
}
//删除管理员
export const mangerDel = (uid) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: {
            uid: uid
        }
    })
}
//管理员登录
export const mangerLogin = (form) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: form
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~商品分类管理接口
//商品分类添加
export const cateAdd = (form) => {
    let data = new FormData();
    for (let key in form) {
        data.append(key, form[key]);
    }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: data
    })
}
//商品分类列表
export const cateList = (params) => {
    return axios({
        url: baseUrl + '/api/catelist',
        method: 'get',
        params: params
    })
}
//商品分类获取(一条)
export const cateInfo = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//商品分类信息修改
export const cateUpdate = (form) => {
    let data = new FormData();
    for (let key in form) {
        data.append(key, form[key]);
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: data
    })
}
//删除商品分类
export const cateDel = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: {
            id: id
        }
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~商品规格管理部分
//商品规格添加
export const specsadd = (form) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: form
    })
}
//商品规格总数  用于计算分页
export const specscount = () => {
    return axios({
        url: baseUrl + '/api/specscount',
        method: 'get'
    })
}
//商品规格列表  用于分页使用
export const specslist = (form) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params: form
    })
}
//获取一条商品规格信息
export const specsinfo = (id) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//商品规格修改
export const specsedit = (form) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: form
    })
}
//商品规格删除
export const specsDel = (id) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: {
            id: id
        }
    })
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~商品管理
//商品添加
export const goodsAdd = (form) => {
    let data = new FormData();
    for (let key in form) {
        data.append(key, form[key]);
    }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data: data
    })
}
//商品总数  计算分页
export const goodscount = () => {
    return axios({
        url: baseUrl + '/api/goodscount',
        method: 'get'
    })
}
//商品列表
export const goodslist = (form) => axios({
    url: baseUrl + '/api/goodslist',
    method: 'get',
    params: form
})
//获取一条商品信息
export const goodsinfo = (id) => axios({
    url: baseUrl + '/api/goodsinfo',
    method: 'get',
    params: {
        id
    }
})
//商品修改
export const goodsedit = (form) => {
    let data = new FormData();
    for (let key in form) {
        data.append(key, form[key]);
    }
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data
    })
}
//商品删除
export const goodsDel = (id) => axios({
    url: baseUrl + '/api/goodsdelete',
    method: 'post',
    data: {
        id
    }
})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~会员管理
export const memlist=()=>{
    return axios({
        url:baseUrl+'/api/memberlist',
        method:'get'
    })
}
//会员信息 一条
export const meminfo=(uid)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:{
            uid
        }
    })
}
//会员信息修改
export const memup=(data)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:'post',
        data
    })
}
//轮播图接口
//添加轮播图
export const banneradd=(data)=>{
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data
    })
}
//轮播图列表
export const bannerlist=()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get'
    })
}
//轮播图获取（一条)
export const bannerinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:{
            id
        }
    })
}
//修改轮播图
export const banneredit=(data)=>{
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data
    })
}
//删除轮播图
export const bannerDel=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:{
            id
        }
    })
}
//~~~~~~~~~~~~~~~~~~限时秒杀接口
//添加 限时秒杀
export const seckadd=(data)=>{
    return axios({
        url:baseUrl+'/api/seckadd',
        method:'post',
        data:data
    })
}
//限时秒杀列表
export const secklist=()=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get'
    })
}
//获取一条限时秒杀信息
export const seckinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params:{
            id
        }
    })
}
//限时秒杀修改
export const seckedit=(data)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:data
    })
}
//限时秒杀删除
export const seckDel=(id)=>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:'post',
        data:{
            id
        }
    })
}