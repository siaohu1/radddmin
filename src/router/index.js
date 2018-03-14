import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    mode:'hash',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/time',
            component: resolve => require(['../timm.vue'], resolve),
        },
        {
            path: '/projectList',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/ProjectList.vue'], resolve)
                },
                {
                    path: '/industryList',
                    component: resolve => require(['../components/page/IndustryList.vue'], resolve)   //
                },
                {
                    path: '/votingList',
                    component: resolve => require(['../components/page/VotingList.vue'], resolve)
                },
                {
                    path: '/tagManagement',
                    component: resolve => require(['../components/page/TagManagement.vue'], resolve)
                },
            ]
        },
        {
            path: '/editor',
            component: resolve => require(['../components/page/Editor.vue'],resolve)
        },
        {
            path: '/editorDetail',
            component: resolve => require(['../components/page/EditorDetail.vue'],resolve)
        },
        {
            path: '/vote',
            component: resolve => require(['../components/page/Vote.vue'],resolve)
        },
        {
            path: '/editorVote',
            component: resolve => require(['../components/page/EditorVote.vue'],resolve)
        },
        {
            path: '/editorRateContent',
            component: resolve => require(['../components/page/EditorContext.vue'],resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !localStorage.token) {
        next({name: 'login'})
    } else {
        next()
    }
})

export default router
