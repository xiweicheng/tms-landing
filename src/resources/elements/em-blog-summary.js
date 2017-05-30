import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogSummary {

    page = 0;
    size = 3;
    blogs = [];

    bind() {
        this._getBlogs();
    }

    _getBlogs() {
        this.ajax = $.get('/free/home/blogs', {
            page: this.page,
            size: this.size,
        }, (data) => {
            this.blogPage = data.data;
            this.blogs.push(...data.data.content);
        });
    }

    moreHandler() {
        this.page++;
        this._getBlogs();
    }
}
