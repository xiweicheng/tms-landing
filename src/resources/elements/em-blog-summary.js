import { bindable, containerless } from 'aurelia-framework';
import {observable} from "aurelia-binding";

@containerless
export class EmBlogSummary {

    @bindable sid;

    page = 0;
    size = 7;
    blogs = [];
    loading = false;
    maxLoad = 3;//最大滚动加载次数

    constructor() {
        let tmpThis = this;//下文因function this对象变化

        $(window).scroll(function() { //滚动加载
            let scrollHeight = $(document).height();//document的滚动高度
            let scrollTop = $(document).scrollTop() || $(this).scrollTop();//已滚动高度
            let windowHeight = $(this).height(); //可视区高度
            let overHeight = 200;//距底部开始加载的距离
            // 简单判断，避免滚动过快时多次加载
            // 理论上应该是页面渲染完再修改，aurelia无此回调接口，观察者属性亦不生效，退而求其次只判断数据加载
            if (!tmpThis.loading && scrollTop + windowHeight + overHeight >= scrollHeight && tmpThis.page < tmpThis.maxLoad) {
                tmpThis.page++;
                tmpThis._getBlogs();
            }
        });
    }

    bind() {
        this._getBlogs();
    }

    _getBlogs() {
        let url = `/free/home/blogs`;
        if (this.sid) {
            url = `/free/space/home/${this.sid}/blogs`;
        }
        this.loading = true;
        this.ajax = $.get(url, {
            page: this.page,
            size: this.size,
        }, (data) => {
            this.blogPage = data.data;
            this.blogs.push(...data.data.content);
            this.loading = false;
        });
    }

    moreHandler() {
        this.page++;
        this._getBlogs();
    }
}
