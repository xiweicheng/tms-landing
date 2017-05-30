import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogList {

    page = 0;
    size = 10;
    blogs = [];

    _listBlogs() {
        this.ajax = $.get('/free/home/blog/list', {
            size: this.size,
            page: this.page
        }, (data) => {
            this.blogPage = data.data;
            this.blogs.push(...data.data.content);
        });
    }

    moreHandler() {
    	this.page++;
    	this._listBlogs();
    }

    bind(bindingCtx, overrideCtx) {
    	this._listBlogs();
    }
}
