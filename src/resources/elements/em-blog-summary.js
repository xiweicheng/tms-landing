import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmBlogSummary {

    @bindable sid;

    page = 0;
    size = 3;
    blogs = [];

    bind() {
        this._getBlogs();
    }

    _getBlogs() {
        let url = `/free/home/blogs`;
        if (this.sid) {
            url = `/free/space/home/${this.sid}/blogs`;
        }
        this.ajax = $.get(url, {
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
